// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1, // 10% of transactions for performance monitoring

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Enable Session Replay for error reproduction
  replaysOnErrorSampleRate: 1.0, // Capture 100% of sessions with errors

  // Sample rate for general session replays (expensive, keep low)
  replaysSessionSampleRate: 0.1, // 10% of sessions

  // Environment configuration
  environment: process.env.NODE_ENV,

  // Only initialize in production or when DSN is configured
  enabled:
    process.env.NODE_ENV === "production" ||
    !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Integration configuration
  integrations: [
    Sentry.replayIntegration({
      // Mask all text and inputs by default for privacy
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserTracingIntegration(),
  ],
});
