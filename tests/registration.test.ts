import { describe, it, expect, beforeAll, afterAll } from "vitest";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma/index.js";
import * as fs from "fs";

describe("User Registration", () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    // Cleanup test data
    await prisma.user.deleteMany({
      where: {
        email: {
          startsWith: "reg-test-",
        },
      },
    });
    await prisma.tenant.deleteMany({
      where: {
        slug: {
          startsWith: "reg-test-",
        },
      },
    });
    await prisma.$disconnect();
  });

  describe("Password Hashing", () => {
    it("should hash passwords with bcrypt work factor 12", async () => {
      const password = "TestPassword123!";
      const hash = await bcrypt.hash(password, 12);

      // Verify bcrypt hash format and work factor
      expect(hash).toMatch(/^\$2[aby]\$12\$/);
    });

    it("should verify correct password against hash", async () => {
      const password = "MySecurePassword123!";
      const hash = await bcrypt.hash(password, 12);

      const isValid = await bcrypt.compare(password, hash);
      expect(isValid).toBe(true);
    });

    it("should reject incorrect password against hash", async () => {
      const password = "MySecurePassword123!";
      const hash = await bcrypt.hash(password, 12);

      const isValid = await bcrypt.compare("WrongPassword123!", hash);
      expect(isValid).toBe(false);
    });
  });

  describe("Registration Flow", () => {
    it("should create tenant and user in transaction", async () => {
      const email = `reg-test-${Date.now()}@example.com`;
      const passwordHash = await bcrypt.hash("TestPassword123!", 12);

      // Simulate registration transaction
      const result = await prisma.$transaction(async (tx) => {
        const tenant = await tx.tenant.create({
          data: {
            name: "Test Workspace",
            slug: `reg-test-${Date.now()}`,
          },
        });

        const user = await tx.user.create({
          data: {
            email,
            name: "Test User",
            passwordHash,
            tenantId: tenant.id,
            role: "AGENCY_OWNER",
          },
        });

        return { user, tenant };
      });

      expect(result.tenant).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.tenantId).toBe(result.tenant.id);
      expect(result.user.role).toBe("AGENCY_OWNER");
    });

    it("should enforce email uniqueness", async () => {
      const email = `reg-test-unique-${Date.now()}@example.com`;
      const passwordHash = await bcrypt.hash("TestPassword123!", 12);

      // Create first user
      const tenant1 = await prisma.tenant.create({
        data: { name: "Tenant 1", slug: `reg-test-t1-${Date.now()}` },
      });
      await prisma.user.create({
        data: {
          email,
          name: "User 1",
          passwordHash,
          tenantId: tenant1.id,
          role: "AGENCY_OWNER",
        },
      });

      // Attempt to create second user with same email should fail
      const tenant2 = await prisma.tenant.create({
        data: { name: "Tenant 2", slug: `reg-test-t2-${Date.now()}` },
      });

      await expect(
        prisma.user.create({
          data: {
            email, // Same email
            name: "User 2",
            passwordHash,
            tenantId: tenant2.id,
            role: "AGENCY_OWNER",
          },
        })
      ).rejects.toThrow();
    });
  });

  describe("Auth Router", () => {
    it("should have auth router file", () => {
      expect(fs.existsSync("src/server/api/routers/auth.ts")).toBe(true);
    });

    it("should export register mutation", () => {
      const routerCode = fs.readFileSync(
        "src/server/api/routers/auth.ts",
        "utf-8"
      );
      expect(routerCode).toContain("register:");
      expect(routerCode).toContain(".mutation(");
    });

    it("should include password validation schema", () => {
      const routerCode = fs.readFileSync(
        "src/server/api/routers/auth.ts",
        "utf-8"
      );
      expect(routerCode).toContain("passwordSchema");
      expect(routerCode).toContain(".min(8");
      expect(routerCode).toContain("[A-Z]");
      expect(routerCode).toContain("[a-z]");
      expect(routerCode).toContain("[0-9]");
    });

    it("should check for email uniqueness", () => {
      const routerCode = fs.readFileSync(
        "src/server/api/routers/auth.ts",
        "utf-8"
      );
      expect(routerCode).toContain("existingUser");
      expect(routerCode).toContain("CONFLICT");
    });

    it("should create tenant and user in transaction", () => {
      const routerCode = fs.readFileSync(
        "src/server/api/routers/auth.ts",
        "utf-8"
      );
      expect(routerCode).toContain("$transaction");
      expect(routerCode).toContain("tenant.create");
      expect(routerCode).toContain("user.create");
    });

    it("should use bcrypt with work factor 12", () => {
      const routerCode = fs.readFileSync(
        "src/server/api/routers/auth.ts",
        "utf-8"
      );
      expect(routerCode).toContain("bcrypt.hash");
      expect(routerCode).toContain(", 12)");
    });
  });

  describe("Registration Page", () => {
    it("should have registration page at pages/register.tsx", () => {
      expect(fs.existsSync("src/pages/register.tsx")).toBe(true);
    });

    it("should include email, name, password fields", () => {
      const pageCode = fs.readFileSync("src/pages/register.tsx", "utf-8");
      expect(pageCode).toContain('id="email"');
      expect(pageCode).toContain('id="name"');
      expect(pageCode).toContain('id="password"');
      expect(pageCode).toContain('id="confirmPassword"');
    });

    it("should include company name field (optional)", () => {
      const pageCode = fs.readFileSync("src/pages/register.tsx", "utf-8");
      expect(pageCode).toContain('id="companyName"');
      expect(pageCode).toContain("optional");
    });

    it("should have password visibility toggle", () => {
      const pageCode = fs.readFileSync("src/pages/register.tsx", "utf-8");
      expect(pageCode).toContain("showPassword");
      expect(pageCode).toContain("EyeOff");
      expect(pageCode).toContain("<Eye");
    });

    it("should display password requirements", () => {
      const pageCode = fs.readFileSync("src/pages/register.tsx", "utf-8");
      expect(pageCode).toContain("passwordRequirements");
      expect(pageCode).toContain("8 characters");
      expect(pageCode).toContain("uppercase");
      expect(pageCode).toContain("lowercase");
    });

    it("should have password strength indicator", () => {
      const pageCode = fs.readFileSync("src/pages/register.tsx", "utf-8");
      expect(pageCode).toContain("passwordStrength");
      expect(pageCode).toContain("Weak");
      expect(pageCode).toContain("Medium");
      expect(pageCode).toContain("Strong");
    });

    it("should link to login page", () => {
      const pageCode = fs.readFileSync("src/pages/register.tsx", "utf-8");
      expect(pageCode).toContain('href="/login"');
      expect(pageCode).toContain("Already have an account");
    });

    it("should use react-hook-form with zod", () => {
      const pageCode = fs.readFileSync("src/pages/register.tsx", "utf-8");
      expect(pageCode).toContain("useForm");
      expect(pageCode).toContain("zodResolver");
    });

    it("should call signIn after successful registration", () => {
      const pageCode = fs.readFileSync("src/pages/register.tsx", "utf-8");
      expect(pageCode).toContain('signIn("credentials"');
    });
  });

  describe("Login Page", () => {
    it("should have login page at pages/login.tsx", () => {
      expect(fs.existsSync("src/pages/login.tsx")).toBe(true);
    });

    it("should include email and password fields", () => {
      const pageCode = fs.readFileSync("src/pages/login.tsx", "utf-8");
      expect(pageCode).toContain('id="email"');
      expect(pageCode).toContain('id="password"');
    });

    it("should link to registration page", () => {
      const pageCode = fs.readFileSync("src/pages/login.tsx", "utf-8");
      expect(pageCode).toContain('href="/register"');
      expect(pageCode).toContain("Sign up");
    });

    it("should link to forgot password", () => {
      const pageCode = fs.readFileSync("src/pages/login.tsx", "utf-8");
      expect(pageCode).toContain('href="/auth/forgot-password"');
      expect(pageCode).toContain("Forgot password");
    });
  });

  describe("Dashboard Page", () => {
    it("should have dashboard page", () => {
      expect(fs.existsSync("src/pages/dashboard.tsx")).toBe(true);
    });

    it("should show user information from session", () => {
      const pageCode = fs.readFileSync("src/pages/dashboard.tsx", "utf-8");
      expect(pageCode).toContain("useSession");
      expect(pageCode).toContain("session.user.email");
      expect(pageCode).toContain("session.user.role");
    });

    it("should handle unauthenticated state gracefully", () => {
      const pageCode = fs.readFileSync("src/pages/dashboard.tsx", "utf-8");
      // Middleware handles redirect; dashboard shows loading state or null for no session
      expect(pageCode).toContain("useSession");
      expect(pageCode).toContain("!session");
    });
  });

  describe("Welcome Email Template", () => {
    it("should have welcome email template", () => {
      expect(fs.existsSync("src/lib/email/templates/welcome.tsx")).toBe(true);
    });

    it("should include user name and tenant name", () => {
      const templateCode = fs.readFileSync(
        "src/lib/email/templates/welcome.tsx",
        "utf-8"
      );
      expect(templateCode).toContain("userName");
      expect(templateCode).toContain("tenantName");
    });

    it("should include call-to-action button", () => {
      const templateCode = fs.readFileSync(
        "src/lib/email/templates/welcome.tsx",
        "utf-8"
      );
      expect(templateCode).toContain("<Button");
      expect(templateCode).toContain("Get Started");
    });

    it("should be exported from templates index", () => {
      const indexCode = fs.readFileSync(
        "src/lib/email/templates/index.ts",
        "utf-8"
      );
      expect(indexCode).toContain("WelcomeEmail");
    });
  });
});
