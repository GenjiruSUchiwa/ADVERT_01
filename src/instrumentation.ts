/**
 * Next.js Instrumentation Hook
 *
 * This file is automatically loaded by Next.js at server startup.
 * It's used to initialize monitoring and telemetry services.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Initialize Sentry for server-side monitoring
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  // Initialize Sentry for edge runtime monitoring
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}
