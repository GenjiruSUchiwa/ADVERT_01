import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import {
  runWithTenantContext,
  getCurrentTenantId,
  createPrismaWithRLS,
  type PrismaWithRLS,
} from "../src/server/db/middleware.js";

describe("Row-Level Security (RLS) Middleware", () => {
  let prisma: PrismaWithRLS;
  let tenant1Id: string;
  let tenant2Id: string;

  beforeAll(async () => {
    // Create a Prisma client with tenant RLS extension applied
    prisma = createPrismaWithRLS();

    // Create two test tenants
    const tenant1 = await prisma.tenant.create({
      data: { name: "Tenant 1", slug: "tenant-1-rls" },
    });
    tenant1Id = tenant1.id;

    const tenant2 = await prisma.tenant.create({
      data: { name: "Tenant 2", slug: "tenant-2-rls" },
    });
    tenant2Id = tenant2.id;
  });

  afterAll(async () => {
    // Cleanup: Delete test tenants (cascade will remove users)
    await prisma.tenant.deleteMany({
      where: { slug: { in: ["tenant-1-rls", "tenant-2-rls"] } },
    });
    await prisma.$disconnect();
  });

  describe("Tenant Context Management", () => {
    it("should get current tenant ID from context", () => {
      runWithTenantContext(tenant1Id, () => {
        const tenantId = getCurrentTenantId();
        expect(tenantId).toBe(tenant1Id);
      });
    });

    it("should throw error when tenant context is missing", () => {
      expect(() => getCurrentTenantId()).toThrow(
        "Tenant context required for multi-tenant operation"
      );
    });

    it("should maintain separate contexts for nested calls", () => {
      runWithTenantContext(tenant1Id, () => {
        expect(getCurrentTenantId()).toBe(tenant1Id);

        runWithTenantContext(tenant2Id, () => {
          expect(getCurrentTenantId()).toBe(tenant2Id);
        });

        // Should restore to tenant1Id after nested context
        expect(getCurrentTenantId()).toBe(tenant1Id);
      });
    });
  });

  describe("Automatic tenantId Injection on Create", () => {
    it("should automatically inject tenantId when creating a user", async () => {
      const user = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.create({
          data: {
            email: "user1-tenant1@example.com",
            name: "User 1",
            role: "CONSULTANT",
          },
        });
      });

      expect(user.tenantId).toBe(tenant1Id);
    });

    it("should respect explicitly provided tenantId", async () => {
      // Even if we're in tenant1 context, explicit tenantId should be used
      const user = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.create({
          data: {
            email: "user1-tenant2@example.com",
            name: "User with explicit tenant",
            tenantId: tenant2Id,
            role: "CONSULTANT",
          },
        });
      });

      expect(user.tenantId).toBe(tenant2Id);
    });

    it("should throw error when creating without tenant context", async () => {
      await expect(
        prisma.user.create({
          data: {
            email: "no-context@example.com",
            name: "No Context User",
            role: "CONSULTANT",
          },
        })
      ).rejects.toThrow("Tenant context required for User operation");
    });
  });

  describe("Query Isolation - findMany", () => {
    let testUserIds: string[] = [];

    beforeEach(async () => {
      testUserIds = [];
      // Create users in both tenants
      await runWithTenantContext(tenant1Id, async () => {
        const user1 = await prisma.user.create({
          data: {
            email: `user1-tenant1-${Date.now()}@example.com`,
            name: "Tenant 1 User 1",
            role: "CONSULTANT",
          },
        });
        testUserIds.push(user1.id);

        const user2 = await prisma.user.create({
          data: {
            email: `user2-tenant1-${Date.now()}@example.com`,
            name: "Tenant 1 User 2",
            role: "AGENCY_OWNER",
          },
        });
        testUserIds.push(user2.id);
      });

      await runWithTenantContext(tenant2Id, async () => {
        const user3 = await prisma.user.create({
          data: {
            email: `user1-tenant2-${Date.now()}@example.com`,
            name: "Tenant 2 User 1",
            role: "CONSULTANT",
          },
        });
        testUserIds.push(user3.id);
      });
    });

    it("should return only tenant 1 users when in tenant 1 context", async () => {
      const users = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.findMany();
      });

      expect(users.length).toBeGreaterThanOrEqual(2);
      expect(users.every((u) => u.tenantId === tenant1Id)).toBe(true);
    });

    it("should return only tenant 2 users when in tenant 2 context", async () => {
      const users = await runWithTenantContext(tenant2Id, async () => {
        return await prisma.user.findMany();
      });

      expect(users.length).toBeGreaterThanOrEqual(1);
      expect(users.every((u) => u.tenantId === tenant2Id)).toBe(true);
    });

    it("should not return users from other tenants", async () => {
      const tenant1Users = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.findMany();
      });

      // All users returned should belong to tenant1, none to tenant2
      const hasTenant2User = tenant1Users.some((u) => u.tenantId === tenant2Id);
      expect(hasTenant2User).toBe(false);
    });
  });

  describe("Query Isolation - findFirst and findUnique", () => {
    let tenant1UserId: string;
    let tenant2UserId: string;

    beforeEach(async () => {
      const user1 = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.create({
          data: {
            email: `find-user1-tenant1-${Date.now()}@example.com`,
            name: "Tenant 1 User",
            role: "CONSULTANT",
          },
        });
      });
      tenant1UserId = user1.id;

      const user2 = await runWithTenantContext(tenant2Id, async () => {
        return await prisma.user.create({
          data: {
            email: `find-user1-tenant2-${Date.now()}@example.com`,
            name: "Tenant 2 User",
            role: "CONSULTANT",
          },
        });
      });
      tenant2UserId = user2.id;
    });

    it("should find user in same tenant context", async () => {
      const user = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.findUnique({
          where: { id: tenant1UserId },
        });
      });

      expect(user).toBeDefined();
      expect(user?.id).toBe(tenant1UserId);
    });

    it("should not find user from different tenant", async () => {
      const user = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.findUnique({
          where: { id: tenant2UserId },
        });
      });

      expect(user).toBeNull();
    });

    it("should enforce tenant filtering on findFirst", async () => {
      const user = await runWithTenantContext(tenant2Id, async () => {
        return await prisma.user.findFirst({
          where: { email: "user1-tenant2@example.com" },
        });
      });

      expect(user).toBeDefined();
      expect(user?.tenantId).toBe(tenant2Id);
    });
  });

  describe("Update and Delete Operations", () => {
    let tenant1UserId: string;
    let tenant2UserId: string;

    beforeEach(async () => {
      const user1 = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.create({
          data: {
            email: `update-user1-tenant1-${Date.now()}@example.com`,
            name: "Tenant 1 User",
            role: "CONSULTANT",
          },
        });
      });
      tenant1UserId = user1.id;

      const user2 = await runWithTenantContext(tenant2Id, async () => {
        return await prisma.user.create({
          data: {
            email: `update-user1-tenant2-${Date.now()}@example.com`,
            name: "Tenant 2 User",
            role: "CONSULTANT",
          },
        });
      });
      tenant2UserId = user2.id;
    });

    it("should update user in same tenant", async () => {
      const updated = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.update({
          where: { id: tenant1UserId },
          data: { name: "Updated Name" },
        });
      });

      expect(updated.name).toBe("Updated Name");
    });

    it("should not update user from different tenant", async () => {
      await expect(
        runWithTenantContext(tenant1Id, async () => {
          return await prisma.user.update({
            where: { id: tenant2UserId },
            data: { name: "Should Not Update" },
          });
        })
      ).rejects.toThrow();
    });

    it("should delete user in same tenant", async () => {
      await runWithTenantContext(tenant1Id, async () => {
        await prisma.user.delete({
          where: { id: tenant1UserId },
        });
      });

      // Verify user was deleted by trying to find it in same tenant context
      const deleted = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.findUnique({
          where: { id: tenant1UserId },
        });
      });

      expect(deleted).toBeNull();
    });

    it("should not delete user from different tenant", async () => {
      await expect(
        runWithTenantContext(tenant1Id, async () => {
          return await prisma.user.delete({
            where: { id: tenant2UserId },
          });
        })
      ).rejects.toThrow();

      // Verify user still exists in its own tenant context
      const user = await runWithTenantContext(tenant2Id, async () => {
        return await prisma.user.findUnique({
          where: { id: tenant2UserId },
        });
      });
      expect(user).toBeDefined();
    });
  });

  describe("Tenant Model Bypass", () => {
    it("should allow querying all tenants without context", async () => {
      const tenants = await prisma.tenant.findMany();

      expect(tenants.length).toBeGreaterThanOrEqual(2);
      const slugs = tenants.map((t) => t.slug);
      expect(slugs).toContain("tenant-1-rls");
      expect(slugs).toContain("tenant-2-rls");
    });

    it("should allow creating tenants without context", async () => {
      const tenant = await prisma.tenant.create({
        data: { name: "New Tenant", slug: "new-tenant-rls" },
      });

      expect(tenant).toBeDefined();
      expect(tenant.slug).toBe("new-tenant-rls");

      // Cleanup
      await prisma.tenant.delete({ where: { id: tenant.id } });
    });

    it("should allow querying tenant within tenant context", async () => {
      const tenant = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.tenant.findUnique({
          where: { id: tenant1Id },
        });
      });

      expect(tenant).toBeDefined();
      expect(tenant?.id).toBe(tenant1Id);
    });
  });

  describe("NextAuth Models Bypass", () => {
    it("should allow Account queries without tenant filtering", async () => {
      // Create a user and account
      const user = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.create({
          data: {
            email: "oauth-user@example.com",
            name: "OAuth User",
            role: "CONSULTANT",
          },
        });
      });

      const account = await prisma.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: "google",
          providerAccountId: "google-123",
        },
      });

      // Should be able to query account without tenant context
      const foundAccount = await prisma.account.findUnique({
        where: { id: account.id },
      });

      expect(foundAccount).toBeDefined();
      expect(foundAccount?.provider).toBe("google");

      // Cleanup
      await prisma.account.delete({ where: { id: account.id } });
      await runWithTenantContext(tenant1Id, async () => {
        await prisma.user.delete({ where: { id: user.id } });
      });
    });

    it("should allow Session queries without tenant filtering", async () => {
      const user = await runWithTenantContext(tenant1Id, async () => {
        return await prisma.user.create({
          data: {
            email: "session-user@example.com",
            name: "Session User",
            role: "CONSULTANT",
          },
        });
      });

      const session = await prisma.session.create({
        data: {
          userId: user.id,
          sessionToken: "session-token-" + Date.now(),
          expires: new Date(Date.now() + 86400000),
        },
      });

      // Should be able to query session without tenant context
      const foundSession = await prisma.session.findUnique({
        where: { id: session.id },
      });

      expect(foundSession).toBeDefined();

      // Cleanup
      await prisma.session.delete({ where: { id: session.id } });
      await runWithTenantContext(tenant1Id, async () => {
        await prisma.user.delete({ where: { id: user.id } });
      });
    });
  });
});
