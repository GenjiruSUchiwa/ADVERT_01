import { z } from "zod";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "../../../../generated/prisma";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Create a separate Prisma client without RLS for auth operations
// Registration creates tenants and users before they can have a tenant context
const prismaAuth = new PrismaClient();

/**
 * Password validation schema
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

/**
 * Registration input schema
 */
const registerInputSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: passwordSchema,
    confirmPassword: z.string(),
    companyName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Generate a URL-safe slug from a string
 */
function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 50);
}

/**
 * Generate a unique tenant slug
 * Uses company name if provided, otherwise derives from email
 */
async function generateUniqueTenantSlug(
  companyName: string | undefined,
  email: string
): Promise<string> {
  const baseSlug = companyName
    ? generateSlug(companyName)
    : generateSlug(email.split("@")[0] ?? "user");

  let slug = baseSlug;
  let counter = 1;

  // Keep trying until we find a unique slug
  while (await prismaAuth.tenant.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    if (counter > 100) {
      // Fallback to timestamp-based slug
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }

  return slug;
}

export const authRouter = createTRPCRouter({
  /**
   * Register a new user
   *
   * Creates a new tenant and user in a transaction.
   * The user becomes the AGENCY_OWNER of their tenant.
   */
  register: publicProcedure
    .input(registerInputSchema)
    .mutation(async ({ input }) => {
      const { email, name, password, companyName } = input;

      // Check if email already exists
      const existingUser = await prismaAuth.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An account with this email already exists",
        });
      }

      // Hash password with work factor 12 (as per requirements)
      const passwordHash = await bcrypt.hash(password, 12);

      // Generate unique tenant slug
      const tenantSlug = await generateUniqueTenantSlug(companyName, email);
      const tenantName = companyName ?? `${name}'s Workspace`;

      // Create tenant and user in a transaction
      const result = await prismaAuth.$transaction(async (tx) => {
        // Create tenant
        const tenant = await tx.tenant.create({
          data: {
            name: tenantName,
            slug: tenantSlug,
          },
        });

        // Create user as AGENCY_OWNER of the tenant
        const user = await tx.user.create({
          data: {
            email,
            name,
            passwordHash,
            tenantId: tenant.id,
            role: "AGENCY_OWNER",
          },
          select: {
            id: true,
            email: true,
            name: true,
            tenantId: true,
            role: true,
          },
        });

        return { user, tenant };
      });

      // Return user data for auto-login
      // Note: Auto-login will be handled client-side using signIn()
      return {
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          tenantId: result.user.tenantId,
          role: result.user.role,
        },
        tenant: {
          id: result.tenant.id,
          name: result.tenant.name,
          slug: result.tenant.slug,
        },
      };
    }),

  /**
   * Check if email is available for registration
   */
  checkEmailAvailable: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      const existingUser = await prismaAuth.user.findUnique({
        where: { email: input.email },
        select: { id: true },
      });

      return { available: !existingUser };
    }),
});
