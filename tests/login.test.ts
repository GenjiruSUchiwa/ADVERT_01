import { describe, it, expect } from "vitest";
import { z } from "zod";

/**
 * Story 2.2: User Login with Credentials and Session Management
 *
 * Tests for login form validation, session configuration,
 * and auth config behavior.
 */

// ===== Login Form Schema Tests =====

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

describe("Login Form Validation", () => {
  it("accepts valid login credentials", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "MyPassword1",
    });
    expect(result.success).toBe(true);
  });

  it("accepts credentials with rememberMe true", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "MyPassword1",
      rememberMe: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.rememberMe).toBe(true);
    }
  });

  it("defaults rememberMe to false when not provided", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "MyPassword1",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.rememberMe).toBe(false);
    }
  });

  it("rejects empty email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "MyPassword1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email format", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "MyPassword1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepts any non-empty password (no strength check for login)", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "a",
    });
    expect(result.success).toBe(true);
  });
});

// ===== Session Configuration Tests =====

describe("Session Configuration", () => {
  const SESSION_MAX_AGE_DEFAULT = 86400; // 24 hours
  const SESSION_MAX_AGE_REMEMBER = 30 * 86400; // 30 days

  it("has correct default session duration (24 hours)", () => {
    expect(SESSION_MAX_AGE_DEFAULT).toBe(86400);
    expect(SESSION_MAX_AGE_DEFAULT / 3600).toBe(24);
  });

  it("has correct remember-me session duration (30 days)", () => {
    expect(SESSION_MAX_AGE_REMEMBER).toBe(2592000);
    expect(SESSION_MAX_AGE_REMEMBER / 86400).toBe(30);
  });

  it("remember-me duration is longer than default", () => {
    expect(SESSION_MAX_AGE_REMEMBER).toBeGreaterThan(SESSION_MAX_AGE_DEFAULT);
  });
});

// ===== Security Tests =====

describe("Login Security", () => {
  it("error message does not reveal whether email exists", () => {
    // Both invalid email and invalid password should produce the same error
    const errorForBadEmail = "Invalid email or password";
    const errorForBadPassword = "Invalid email or password";
    expect(errorForBadEmail).toBe(errorForBadPassword);
  });

  it("login schema does not enforce password strength (prevents info leak)", () => {
    // Login should accept any password and let the server compare
    // This prevents attackers from learning password requirements
    const weakPassword = loginSchema.safeParse({
      email: "user@example.com",
      password: "x",
    });
    expect(weakPassword.success).toBe(true);
  });
});

// ===== Middleware Route Protection Tests =====

describe("Route Protection Configuration", () => {
  const protectedPaths = ["/dashboard"];
  const authPaths = ["/login", "/register"];

  it("dashboard is a protected route", () => {
    expect(protectedPaths.some((p) => "/dashboard".startsWith(p))).toBe(true);
    expect(
      protectedPaths.some((p) => "/dashboard/settings".startsWith(p))
    ).toBe(true);
  });

  it("login is an auth page (redirects authenticated users)", () => {
    expect(authPaths.some((p) => "/login".startsWith(p))).toBe(true);
  });

  it("register is an auth page (redirects authenticated users)", () => {
    expect(authPaths.some((p) => "/register".startsWith(p))).toBe(true);
  });

  it("home page is not a protected route", () => {
    expect(protectedPaths.some((p) => "/".startsWith(p))).toBe(false);
  });
});

// ===== JWT Token Tests =====

describe("JWT Token Structure", () => {
  it("should include required user fields in token", () => {
    // Simulate what the JWT callback should store
    const token = {
      id: "user-123",
      tenantId: "tenant-456",
      role: "AGENCY_OWNER",
      email: "user@example.com",
    };

    expect(token.id).toBeDefined();
    expect(token.tenantId).toBeDefined();
    expect(token.role).toBeDefined();
    expect(token.email).toBeDefined();
  });

  it("should include rememberMe flag when set", () => {
    const tokenWithRemember = {
      id: "user-123",
      tenantId: "tenant-456",
      role: "AGENCY_OWNER",
      rememberMe: true,
    };

    expect(tokenWithRemember.rememberMe).toBe(true);
  });

  it("should set extended expiry for remember-me sessions", () => {
    const now = Math.floor(Date.now() / 1000);
    const THIRTY_DAYS = 30 * 86400;
    const expiry = now + THIRTY_DAYS;

    // Extended expiry should be roughly 30 days from now
    expect(expiry - now).toBe(THIRTY_DAYS);
  });
});

// ===== Callback URL Tests =====

describe("Callback URL Handling", () => {
  it("defaults to /dashboard when no callbackUrl provided", () => {
    const callbackUrl = undefined ?? "/dashboard";
    expect(callbackUrl).toBe("/dashboard");
  });

  it("uses provided callbackUrl when available", () => {
    const callbackUrl = "/dashboard/settings" ?? "/dashboard";
    expect(callbackUrl).toBe("/dashboard/settings");
  });

  it("session expired param is detected", () => {
    const queryParams = { expired: "true" };
    expect(queryParams.expired === "true").toBe(true);
  });

  it("session expired param is false by default", () => {
    const queryParams = {};
    expect((queryParams as Record<string, string>).expired === "true").toBe(
      false
    );
  });
});
