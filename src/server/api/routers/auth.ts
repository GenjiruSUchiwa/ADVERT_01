import { z } from "zod";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "../../../../generated/prisma";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { isEmailConfigured, sendEmail } from "~/lib/email/client";
import { PasswordResetEmail } from "~/lib/email/templates/password-reset";
import { PasswordChangedEmail } from "~/lib/email/templates/password-changed";

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

/**
 * Base URL for the application (used in email links)
 */
function getBaseUrl(): string {
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Token expiry duration: 1 hour
 */
const TOKEN_EXPIRY_MS = 60 * 60 * 1000;

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

  /**
   * Request a password reset
   *
   * Generates a token, stores it hashed in VerificationToken,
   * and sends a reset email. Always returns success to prevent
   * email enumeration.
   */
  requestPasswordReset: publicProcedure
    .input(z.object({ email: z.string().email("Invalid email address") }))
    .mutation(async ({ input }) => {
      const { email } = input;

      // Always return the same message regardless of whether email exists
      const successMessage =
        "If that email exists, we've sent a password reset link.";

      // Look up user
      const user = await prismaAuth.user.findUnique({
        where: { email },
        select: { id: true, name: true, email: true },
      });

      if (!user) {
        // Don't reveal that email doesn't exist
        console.log(
          `[AUTH] Password reset requested for non-existent email: ${email} at ${new Date().toISOString()}`
        );
        return { success: true, message: successMessage };
      }

      // Delete any existing tokens for this email (only latest is valid)
      await prismaAuth.verificationToken.deleteMany({
        where: { identifier: email },
      });

      // Generate a cryptographically random token
      const rawToken = crypto.randomBytes(32).toString("hex");

      // Hash the token before storing (so DB compromise doesn't leak tokens)
      const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

      // Store the hashed token
      await prismaAuth.verificationToken.create({
        data: {
          identifier: email,
          token: hashedToken,
          expires: new Date(Date.now() + TOKEN_EXPIRY_MS),
        },
      });

      // Send the reset email with the raw (unhashed) token
      const resetUrl = `${getBaseUrl()}/auth/reset-password?token=${rawToken}`;

      try {
        if (isEmailConfigured()) {
          await sendEmail({
            to: email,
            subject: "Reset your ADVERT password",
            react: PasswordResetEmail({
              userName: user.name ?? "User",
              resetUrl,
            }),
          });
        }
      } catch (error) {
        console.error("[AUTH] Failed to send password reset email:", error);
        // Don't throw - still return success to prevent info leakage
      }

      console.log(
        `[AUTH] Password reset requested for user: ${user.id} at ${new Date().toISOString()}`
      );

      return { success: true, message: successMessage };
    }),

  /**
   * Reset password using a valid token
   *
   * Validates the token, updates the password, deletes the token,
   * and sends a confirmation email.
   */
  resetPassword: publicProcedure
    .input(
      z
        .object({
          token: z.string().min(1, "Token is required"),
          password: passwordSchema,
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path: ["confirmPassword"],
        })
    )
    .mutation(async ({ input }) => {
      const { token, password } = input;

      // Hash the provided token to compare with stored hash
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      // Look up the token
      const verificationToken =
        await prismaAuth.verificationToken.findUnique({
          where: { token: hashedToken },
        });

      if (!verificationToken) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This reset link has already been used or is invalid.",
        });
      }

      // Check if token is expired
      if (verificationToken.expires < new Date()) {
        // Delete expired token
        await prismaAuth.verificationToken.delete({
          where: { token: hashedToken },
        });
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "This reset link has expired. Please request a new one.",
        });
      }

      // Find the user by email (identifier)
      const user = await prismaAuth.user.findUnique({
        where: { email: verificationToken.identifier },
        select: { id: true, name: true, email: true },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(password, 12);

      // Update password and delete token in a transaction
      await prismaAuth.$transaction(async (tx) => {
        // Update user password
        await tx.user.update({
          where: { id: user.id },
          data: { passwordHash },
        });

        // Delete the used token (single-use)
        await tx.verificationToken.delete({
          where: { token: hashedToken },
        });

        // Invalidate all existing sessions for this user (force re-login)
        await tx.session.deleteMany({
          where: { userId: user.id },
        });
      });

      // Send confirmation email
      try {
        if (isEmailConfigured()) {
          await sendEmail({
            to: user.email,
            subject: "Your ADVERT password has been changed",
            react: PasswordChangedEmail({
              userName: user.name ?? "User",
            }),
          });
        }
      } catch (error) {
        console.error(
          "[AUTH] Failed to send password changed email:",
          error
        );
      }

      console.log(
        `[AUTH] Password reset completed for user: ${user.id} at ${new Date().toISOString()}`
      );

      return {
        success: true,
        message: "Password reset successful. You can now log in.",
      };
    }),
});
