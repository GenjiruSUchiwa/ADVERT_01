import { describe, it, expect } from "vitest";
import * as fs from "fs";

describe("Sentry Configuration", () => {
  describe("Configuration Files", () => {
    it("should have sentry.client.config.ts in project root", () => {
      expect(fs.existsSync("sentry.client.config.ts")).toBe(true);
    });

    it("should have sentry.server.config.ts in project root", () => {
      expect(fs.existsSync("sentry.server.config.ts")).toBe(true);
    });

    it("should have sentry.edge.config.ts in project root", () => {
      expect(fs.existsSync("sentry.edge.config.ts")).toBe(true);
    });

    it("should have instrumentation.ts for server initialization", () => {
      expect(fs.existsSync("src/instrumentation.ts")).toBe(true);
    });
  });

  describe("Client Configuration", () => {
    it("should configure DSN from environment variable", () => {
      const clientConfig = fs.readFileSync("sentry.client.config.ts", "utf-8");
      expect(clientConfig).toContain("NEXT_PUBLIC_SENTRY_DSN");
    });

    it("should set tracesSampleRate to 0.1 (10%)", () => {
      const clientConfig = fs.readFileSync("sentry.client.config.ts", "utf-8");
      expect(clientConfig).toContain("tracesSampleRate: 0.1");
    });

    it("should configure environment from NODE_ENV", () => {
      const clientConfig = fs.readFileSync("sentry.client.config.ts", "utf-8");
      expect(clientConfig).toContain("environment: process.env.NODE_ENV");
    });

    it("should include replay integration for error reproduction", () => {
      const clientConfig = fs.readFileSync("sentry.client.config.ts", "utf-8");
      expect(clientConfig).toContain("replayIntegration");
    });

    it("should include browser tracing integration", () => {
      const clientConfig = fs.readFileSync("sentry.client.config.ts", "utf-8");
      expect(clientConfig).toContain("browserTracingIntegration");
    });
  });

  describe("Server Configuration", () => {
    it("should configure DSN from environment variable", () => {
      const serverConfig = fs.readFileSync("sentry.server.config.ts", "utf-8");
      expect(serverConfig).toContain("SENTRY_DSN");
    });

    it("should include Prisma integration for database monitoring", () => {
      const serverConfig = fs.readFileSync("sentry.server.config.ts", "utf-8");
      expect(serverConfig).toContain("prismaIntegration");
    });

    it("should set tracesSampleRate to 0.1 (10%)", () => {
      const serverConfig = fs.readFileSync("sentry.server.config.ts", "utf-8");
      expect(serverConfig).toContain("tracesSampleRate: 0.1");
    });
  });

  describe("Edge Configuration", () => {
    it("should configure DSN from environment variable", () => {
      const edgeConfig = fs.readFileSync("sentry.edge.config.ts", "utf-8");
      expect(edgeConfig).toContain("SENTRY_DSN");
    });

    it("should set tracesSampleRate to 0.1 (10%)", () => {
      const edgeConfig = fs.readFileSync("sentry.edge.config.ts", "utf-8");
      expect(edgeConfig).toContain("tracesSampleRate: 0.1");
    });
  });

  describe("Next.js Integration", () => {
    it("should import withSentryConfig in next.config.js", () => {
      const nextConfig = fs.readFileSync("next.config.js", "utf-8");
      expect(nextConfig).toContain("withSentryConfig");
    });

    it("should configure source map uploads", () => {
      const nextConfig = fs.readFileSync("next.config.js", "utf-8");
      expect(nextConfig).toContain("widenClientFileUpload");
    });

    it("should configure tunnel route for ad-blocker circumvention", () => {
      const nextConfig = fs.readFileSync("next.config.js", "utf-8");
      expect(nextConfig).toContain('tunnelRoute: "/monitoring"');
    });

    it("should conditionally wrap config based on SENTRY_DSN", () => {
      const nextConfig = fs.readFileSync("next.config.js", "utf-8");
      expect(nextConfig).toContain("process.env.SENTRY_DSN");
    });
  });

  describe("Instrumentation Hook", () => {
    it("should load server config for nodejs runtime", () => {
      const instrumentation = fs.readFileSync("src/instrumentation.ts", "utf-8");
      expect(instrumentation).toContain('NEXT_RUNTIME === "nodejs"');
      expect(instrumentation).toContain("sentry.server.config");
    });

    it("should load edge config for edge runtime", () => {
      const instrumentation = fs.readFileSync("src/instrumentation.ts", "utf-8");
      expect(instrumentation).toContain('NEXT_RUNTIME === "edge"');
      expect(instrumentation).toContain("sentry.edge.config");
    });

    it("should export register function", () => {
      const instrumentation = fs.readFileSync("src/instrumentation.ts", "utf-8");
      expect(instrumentation).toContain("export async function register()");
    });
  });

  describe("Test Error Route", () => {
    it("should have test route at api/sentry-test", () => {
      expect(fs.existsSync("src/app/api/sentry-test/route.ts")).toBe(true);
    });

    it("should throw test error by default", () => {
      const testRoute = fs.readFileSync(
        "src/app/api/sentry-test/route.ts",
        "utf-8"
      );
      expect(testRoute).toContain('throw new Error("Sentry Test Error');
    });

    it("should support manual capture mode", () => {
      const testRoute = fs.readFileSync(
        "src/app/api/sentry-test/route.ts",
        "utf-8"
      );
      expect(testRoute).toContain("Sentry.captureException");
      expect(testRoute).toContain('captureMode === "manual"');
    });
  });

  describe("Environment Configuration", () => {
    it("should have SENTRY_DSN in env schema", () => {
      const envConfig = fs.readFileSync("src/env.js", "utf-8");
      expect(envConfig).toContain("SENTRY_DSN");
    });

    it("should have NEXT_PUBLIC_SENTRY_DSN in env schema", () => {
      const envConfig = fs.readFileSync("src/env.js", "utf-8");
      expect(envConfig).toContain("NEXT_PUBLIC_SENTRY_DSN");
    });

    it("should have SENTRY_AUTH_TOKEN in env schema", () => {
      const envConfig = fs.readFileSync("src/env.js", "utf-8");
      expect(envConfig).toContain("SENTRY_AUTH_TOKEN");
    });

    it("should have SENTRY_ORG in env schema", () => {
      const envConfig = fs.readFileSync("src/env.js", "utf-8");
      expect(envConfig).toContain("SENTRY_ORG");
    });

    it("should have SENTRY_PROJECT in env schema", () => {
      const envConfig = fs.readFileSync("src/env.js", "utf-8");
      expect(envConfig).toContain("SENTRY_PROJECT");
    });

    it("should document Sentry variables in .env.example", () => {
      const envExample = fs.readFileSync(".env.example", "utf-8");
      expect(envExample).toContain("SENTRY_DSN");
      expect(envExample).toContain("NEXT_PUBLIC_SENTRY_DSN");
      expect(envExample).toContain("SENTRY_AUTH_TOKEN");
    });
  });
});
