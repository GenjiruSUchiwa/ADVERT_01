import { env } from "~/env";
import { PrismaClient } from "../../generated/prisma";
import { tenantExtension } from "./db/middleware";

// Export tenant context helpers for use in application code
export { runWithTenantContext, getCurrentTenantId } from "./db/middleware";

const createPrismaClient = () => {
  const client = new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Apply tenant isolation extension globally
  return client.$extends(tenantExtension);
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
