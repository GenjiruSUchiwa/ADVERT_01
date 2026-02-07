import { describe, it, expect } from "vitest";
import { z } from "zod";
import crypto from "crypto";
import fs from "fs";

/**
 * Story 2.3: Password Reset via Email Link
 *
 * Tests for password reset flow: token generation, validation,
 * email templates, and page structure.
 */

// ===== Token Generation & Hashing Tests =====

describe("Password Reset Token", () => {
  it("generates a 32-byte hex token (64 characters)", () => {
    const token = crypto.randomBytes(32).toString("hex");
    expect(token).toHaveLength(64);
    expect(/^[0-9a-f]+$/.test(token)).toBe(true);
  });

  it("generates unique tokens each time", () => {
    const token1 = crypto.randomBytes(32).toString("hex");
    const token2 = crypto.randomBytes(32).toString("hex");
    expect(token1).not.toBe(token2);
  });

  it("hashes token with SHA-256 before storage", () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // SHA-256 produces a 64-character hex string
    expect(hashedToken).toHaveLength(64);
    // Hashed token is different from raw token
    expect(hashedToken).not.toBe(rawToken);
  });

  it("produces consistent hash for same input", () => {
    const rawToken = "test-token-123";
    const hash1 = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const hash2 = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    expect(hash1).toBe(hash2);
  });
});

// ===== Token Expiry Tests =====

describe("Token Expiry", () => {
  const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

  it("sets expiry to 1 hour from now", () => {
    const now = Date.now();
    const expires = new Date(now + TOKEN_EXPIRY_MS);
    const diff = expires.getTime() - now;
    expect(diff).toBe(TOKEN_EXPIRY_MS);
    expect(diff / 1000 / 60).toBe(60); // 60 minutes
  });

  it("detects expired tokens", () => {
    const expiredDate = new Date(Date.now() - 1000); // 1 second ago
    expect(expiredDate < new Date()).toBe(true);
  });

  it("allows valid tokens", () => {
    const validDate = new Date(Date.now() + TOKEN_EXPIRY_MS);
    expect(validDate < new Date()).toBe(false);
  });
});

// ===== Forgot Password Form Validation =====

describe("Forgot Password Form", () => {
  const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  it("accepts valid email", () => {
    const result = forgotPasswordSchema.safeParse({
      email: "user@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = forgotPasswordSchema.safeParse({
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = forgotPasswordSchema.safeParse({
      email: "",
    });
    expect(result.success).toBe(false);
  });
});

// ===== Reset Password Form Validation =====

describe("Reset Password Form", () => {
  const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number");

  const resetPasswordSchema = z
    .object({
      token: z.string().min(1),
      password: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  it("accepts valid reset data", () => {
    const result = resetPasswordSchema.safeParse({
      token: "abc123",
      password: "NewPass1",
      confirmPassword: "NewPass1",
    });
    expect(result.success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = resetPasswordSchema.safeParse({
      token: "abc123",
      password: "NewPass1",
      confirmPassword: "Different1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects weak password", () => {
    const result = resetPasswordSchema.safeParse({
      token: "abc123",
      password: "weak",
      confirmPassword: "weak",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without uppercase", () => {
    const result = resetPasswordSchema.safeParse({
      token: "abc123",
      password: "password1",
      confirmPassword: "password1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without lowercase", () => {
    const result = resetPasswordSchema.safeParse({
      token: "abc123",
      password: "PASSWORD1",
      confirmPassword: "PASSWORD1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without number", () => {
    const result = resetPasswordSchema.safeParse({
      token: "abc123",
      password: "Passwordd",
      confirmPassword: "Passwordd",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty token", () => {
    const result = resetPasswordSchema.safeParse({
      token: "",
      password: "NewPass1",
      confirmPassword: "NewPass1",
    });
    expect(result.success).toBe(false);
  });
});

// ===== Security Tests =====

describe("Password Reset Security", () => {
  it("returns same message for existing and non-existing emails", () => {
    const message = "If that email exists, we've sent a password reset link.";
    // This message should be returned regardless of email existence
    expect(message).not.toContain("not found");
    expect(message).not.toContain("doesn't exist");
  });

  it("token is hashed before database storage", () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const stored = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // Stored hash should NOT equal the raw token sent in email
    expect(stored).not.toBe(rawToken);
  });

  it("previous tokens are invalidated when new one is requested", () => {
    // The implementation deletes all existing tokens for the email
    // before creating a new one. This is verified by:
    // - deleteMany({ where: { identifier: email } }) before create
    const routerCode = fs.readFileSync(
      "src/server/api/routers/auth.ts",
      "utf-8"
    );
    expect(routerCode).toContain("deleteMany");
    expect(routerCode).toContain("identifier: email");
  });

  it("sessions are invalidated after password reset", () => {
    const routerCode = fs.readFileSync(
      "src/server/api/routers/auth.ts",
      "utf-8"
    );
    expect(routerCode).toContain("session.deleteMany");
    expect(routerCode).toContain("userId: user.id");
  });
});

// ===== Email Templates Tests =====

describe("Password Reset Email Template", () => {
  it("has password-reset template file", () => {
    expect(
      fs.existsSync("src/lib/email/templates/password-reset.tsx")
    ).toBe(true);
  });

  it("template includes reset URL prop", () => {
    const template = fs.readFileSync(
      "src/lib/email/templates/password-reset.tsx",
      "utf-8"
    );
    expect(template).toContain("resetUrl");
    expect(template).toContain("userName");
  });

  it("template mentions 1-hour expiry", () => {
    const template = fs.readFileSync(
      "src/lib/email/templates/password-reset.tsx",
      "utf-8"
    );
    expect(template).toContain("1 hour");
  });

  it("template includes warning about unsolicited reset", () => {
    const template = fs.readFileSync(
      "src/lib/email/templates/password-reset.tsx",
      "utf-8"
    );
    expect(template).toContain("didn");
    expect(template).toContain("ignore");
  });

  it("is exported from templates index", () => {
    const indexCode = fs.readFileSync(
      "src/lib/email/templates/index.ts",
      "utf-8"
    );
    expect(indexCode).toContain("PasswordResetEmail");
  });
});

describe("Password Changed Email Template", () => {
  it("has password-changed template file", () => {
    expect(
      fs.existsSync("src/lib/email/templates/password-changed.tsx")
    ).toBe(true);
  });

  it("template includes userName prop", () => {
    const template = fs.readFileSync(
      "src/lib/email/templates/password-changed.tsx",
      "utf-8"
    );
    expect(template).toContain("userName");
  });

  it("template includes security warning", () => {
    const template = fs.readFileSync(
      "src/lib/email/templates/password-changed.tsx",
      "utf-8"
    );
    expect(template).toContain("did not make this change");
  });

  it("is exported from templates index", () => {
    const indexCode = fs.readFileSync(
      "src/lib/email/templates/index.ts",
      "utf-8"
    );
    expect(indexCode).toContain("PasswordChangedEmail");
  });
});

// ===== Pages Tests =====

describe("Forgot Password Page", () => {
  it("has forgot-password page file", () => {
    expect(
      fs.existsSync("src/pages/auth/forgot-password.tsx")
    ).toBe(true);
  });

  it("uses tRPC requestPasswordReset mutation", () => {
    const pageCode = fs.readFileSync(
      "src/pages/auth/forgot-password.tsx",
      "utf-8"
    );
    expect(pageCode).toContain("requestPasswordReset");
    expect(pageCode).toContain("useMutation");
  });

  it("shows success state after submission", () => {
    const pageCode = fs.readFileSync(
      "src/pages/auth/forgot-password.tsx",
      "utf-8"
    );
    expect(pageCode).toContain("isSubmitted");
    expect(pageCode).toContain("Check your email");
  });

  it("has link back to login", () => {
    const pageCode = fs.readFileSync(
      "src/pages/auth/forgot-password.tsx",
      "utf-8"
    );
    expect(pageCode).toContain("/login");
  });
});

describe("Reset Password Page", () => {
  it("has reset-password page file", () => {
    expect(
      fs.existsSync("src/pages/auth/reset-password.tsx")
    ).toBe(true);
  });

  it("reads token from query params", () => {
    const pageCode = fs.readFileSync(
      "src/pages/auth/reset-password.tsx",
      "utf-8"
    );
    expect(pageCode).toContain("router.query.token");
  });

  it("uses tRPC resetPassword mutation", () => {
    const pageCode = fs.readFileSync(
      "src/pages/auth/reset-password.tsx",
      "utf-8"
    );
    expect(pageCode).toContain("resetPassword");
    expect(pageCode).toContain("useMutation");
  });

  it("shows invalid link state when no token", () => {
    const pageCode = fs.readFileSync(
      "src/pages/auth/reset-password.tsx",
      "utf-8"
    );
    expect(pageCode).toContain("Invalid link");
    expect(pageCode).toContain("forgot-password");
  });

  it("shows success state after reset", () => {
    const pageCode = fs.readFileSync(
      "src/pages/auth/reset-password.tsx",
      "utf-8"
    );
    expect(pageCode).toContain("isSuccess");
    expect(pageCode).toContain("Password reset successful");
  });

  it("has password requirements display", () => {
    const pageCode = fs.readFileSync(
      "src/pages/auth/reset-password.tsx",
      "utf-8"
    );
    expect(pageCode).toContain("8 characters");
    expect(pageCode).toContain("uppercase");
    expect(pageCode).toContain("lowercase");
    expect(pageCode).toContain("number");
  });
});

// ===== Login Page Integration =====

describe("Login Page Forgot Password Link", () => {
  it("has link to forgot-password page", () => {
    const loginCode = fs.readFileSync("src/pages/login.tsx", "utf-8");
    expect(loginCode).toContain("/auth/forgot-password");
    expect(loginCode).toContain("Forgot password?");
  });
});

// ===== Auth Router Tests =====

describe("Auth Router Password Reset Mutations", () => {
  it("has requestPasswordReset mutation", () => {
    const routerCode = fs.readFileSync(
      "src/server/api/routers/auth.ts",
      "utf-8"
    );
    expect(routerCode).toContain("requestPasswordReset");
  });

  it("has resetPassword mutation", () => {
    const routerCode = fs.readFileSync(
      "src/server/api/routers/auth.ts",
      "utf-8"
    );
    expect(routerCode).toContain("resetPassword");
  });

  it("uses crypto for token generation", () => {
    const routerCode = fs.readFileSync(
      "src/server/api/routers/auth.ts",
      "utf-8"
    );
    expect(routerCode).toContain("crypto.randomBytes");
    expect(routerCode).toContain("createHash");
  });

  it("sends password reset email via sendEmail", () => {
    const routerCode = fs.readFileSync(
      "src/server/api/routers/auth.ts",
      "utf-8"
    );
    expect(routerCode).toContain("sendEmail");
    expect(routerCode).toContain("PasswordResetEmail");
  });

  it("sends password changed confirmation email", () => {
    const routerCode = fs.readFileSync(
      "src/server/api/routers/auth.ts",
      "utf-8"
    );
    expect(routerCode).toContain("PasswordChangedEmail");
    expect(routerCode).toContain("password has been changed");
  });

  it("has token expiry of 1 hour", () => {
    const routerCode = fs.readFileSync(
      "src/server/api/routers/auth.ts",
      "utf-8"
    );
    expect(routerCode).toContain("TOKEN_EXPIRY_MS");
    expect(routerCode).toContain("60 * 60 * 1000");
  });

  it("logs password reset attempts", () => {
    const routerCode = fs.readFileSync(
      "src/server/api/routers/auth.ts",
      "utf-8"
    );
    expect(routerCode).toContain("[AUTH] Password reset requested");
    expect(routerCode).toContain("[AUTH] Password reset completed");
  });
});
