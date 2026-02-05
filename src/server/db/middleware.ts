import { AsyncLocalStorage } from "async_hooks";
import { Prisma, PrismaClient } from "../../../generated/prisma";

/**
 * Tenant Context for Row-Level Security
 *
 * Uses AsyncLocalStorage to maintain tenant context across async operations
 * without explicitly passing it through every function call.
 */
interface TenantContext {
  tenantId: string;
}

export const tenantContext = new AsyncLocalStorage<TenantContext>();

/**
 * Get the current tenant ID from context
 * @throws Error if tenant context is not set
 */
export function getCurrentTenantId(): string {
  const context = tenantContext.getStore();
  if (!context) {
    throw new Error("Tenant context required for multi-tenant operation");
  }
  return context.tenantId;
}

/**
 * Try to get tenant ID from context without throwing
 * @returns Tenant ID or undefined if not set
 */
export function getTenantIdOrUndefined(): string | undefined {
  const context = tenantContext.getStore();
  return context?.tenantId;
}

/**
 * Set tenant context for the duration of a callback
 * @param tenantId - The tenant ID to set
 * @param callback - Function to execute with tenant context
 */
export function runWithTenantContext<T>(
  tenantId: string,
  callback: () => T
): T {
  return tenantContext.run({ tenantId }, callback);
}

/**
 * Models that have tenantId and should be filtered
 */
const TENANT_SCOPED_MODELS = ["User"];

/**
 * Models that should bypass tenant filtering
 * - Tenant: The tenant lookup table itself
 * - Account, Session, VerificationToken: Linked via User, not directly scoped
 */
const BYPASS_MODELS = ["Tenant", "Account", "Session", "VerificationToken"];

/**
 * Prisma Client Extension for Row-Level Security (RLS)
 *
 * Automatically enforces tenant isolation by:
 * 1. Adding `where: { tenantId }` to all read queries on tenant-scoped models
 * 2. Injecting tenantId into create operations
 * 3. Preventing cross-tenant data access
 */
export const tenantExtension = Prisma.defineExtension({
  name: "tenantRLS",
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        // Skip if no model
        if (!model) {
          return query(args);
        }

        // Normalize model name (handle both "User" and "user" casing)
        const modelName = model.charAt(0).toUpperCase() + model.slice(1);

        // Skip models that should bypass tenant filtering
        if (BYPASS_MODELS.includes(modelName)) {
          return query(args);
        }

        // Skip models that don't have tenantId
        if (!TENANT_SCOPED_MODELS.includes(modelName)) {
          return query(args);
        }

        // For tenant-scoped models, get tenant ID
        // Use the non-throwing version to check if context exists
        const currentTenantId = getTenantIdOrUndefined();

        // If no tenant context, throw error for tenant-scoped operations
        if (!currentTenantId) {
          throw new Error(
            `Tenant context required for ${modelName} operation: ${operation}`
          );
        }

        // Handle different Prisma operations
        switch (operation) {
          // Read operations - add tenant filter
          case "findUnique":
          case "findUniqueOrThrow":
          case "findFirst":
          case "findFirstOrThrow":
          case "findMany":
          case "count":
          case "aggregate":
          case "groupBy":
            args.where = args.where || {};
            if (typeof args.where === "object") {
              args.where = {
                ...args.where,
                tenantId: currentTenantId,
              };
            }
            break;

          // Create operations - inject tenantId if not provided
          case "create":
          case "createAndReturn":
            args.data = args.data || {};
            if (typeof args.data === "object") {
              const providedTenantId = (args.data as any).tenantId;

              // Inject tenantId only if not explicitly provided
              // This allows explicit override for admin/cross-tenant operations
              if (!providedTenantId) {
                args.data = {
                  ...args.data,
                  tenantId: currentTenantId,
                };
              }
            }
            break;

          // Batch create - inject tenantId for each record if not provided
          case "createMany":
          case "createManyAndReturn":
            if (Array.isArray(args.data)) {
              args.data = args.data.map((record: any) => ({
                ...record,
                tenantId: record.tenantId || currentTenantId,
              }));
            }
            break;

          // Update operations - ensure tenant filter
          case "update":
          case "updateMany":
            args.where = args.where || {};
            if (typeof args.where === "object") {
              args.where = {
                ...args.where,
                tenantId: currentTenantId,
              };
            }
            break;

          // Upsert - filter where and inject into create
          case "upsert":
            args.where = args.where || {};
            if (typeof args.where === "object") {
              args.where = {
                ...args.where,
                tenantId: currentTenantId,
              };
            }
            if (args.create && typeof args.create === "object") {
              args.create = {
                ...args.create,
                tenantId: (args.create as any).tenantId || currentTenantId,
              };
            }
            break;

          // Delete operations - ensure tenant filter
          case "delete":
          case "deleteMany":
            args.where = args.where || {};
            if (typeof args.where === "object") {
              args.where = {
                ...args.where,
                tenantId: currentTenantId,
              };
            }
            break;
        }

        return query(args);
      },
    },
  },
});

/**
 * Create a Prisma Client with tenant RLS extension applied
 * Use this helper in tests or when you need a fresh client with RLS
 */
export function createPrismaWithRLS() {
  const client = new PrismaClient();
  return client.$extends(tenantExtension);
}

// Export the extension type for use in application code
export type PrismaWithRLS = ReturnType<typeof createPrismaWithRLS>;
