import { type NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

/**
 * Test route to verify Sentry error tracking
 *
 * GET /api/sentry-test - Throws a test error to verify Sentry capture
 * GET /api/sentry-test?capture=manual - Uses manual capture instead of throw
 *
 * This route should only be used in development/staging environments.
 * In production, errors are naturally captured by the application.
 */
export async function GET(request: NextRequest) {
  const captureMode = request.nextUrl.searchParams.get("capture");

  if (captureMode === "manual") {
    // Manually capture an error without throwing
    Sentry.captureException(new Error("Sentry Manual Test Error"));

    return NextResponse.json({
      success: true,
      message: "Error manually captured and sent to Sentry",
      mode: "manual",
    });
  }

  // Throw an error to test automatic capture
  throw new Error("Sentry Test Error - Automatic Capture");
}
