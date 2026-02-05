# Story 1.6: Setup Sentry Error Tracking and Monitoring

## Story

As a **developer**,
I want **Sentry configured for error tracking and performance monitoring**,
So that **I can proactively detect and debug errors in production**.

## Status

✅ Complete

## Acceptance Criteria

1. **AC1: Sentry Package Installation**
   - Install `@sentry/nextjs` package
   - Latest stable version in package.json

2. **AC2: Sentry Client Configuration**
   - Create `sentry.client.config.ts`
   - Initialize with DSN from environment variable
   - tracesSampleRate set to 0.1 (10%)
   - Environment set from NODE_ENV

3. **AC3: Sentry Server Configuration**
   - Create `sentry.server.config.ts`
   - Prisma integration for query monitoring
   - Same DSN configuration as client

4. **AC4: Environment Variables**
   - SENTRY_DSN configured
   - SENTRY_AUTH_TOKEN for source map uploads
   - .env.example documented

5. **AC5: Next.js Integration**
   - next.config.js includes Sentry webpack plugin
   - Source maps uploaded on build
   - Production builds include Sentry instrumentation

6. **AC6: Test Error Route**
   - Create `/api/sentry-test` route
   - Throws test error for verification
   - Error captured with full stack trace

## Technical Notes

- Sentry Next.js SDK provides automatic instrumentation
- Performance monitoring captures page loads and API routes
- Source maps enable readable stack traces
- Error grouping consolidates similar errors

## Tasks

- [x] Task 1: Install @sentry/nextjs package
- [x] Task 2: Create sentry.client.config.ts
- [x] Task 3: Create sentry.server.config.ts
- [x] Task 4: Update next.config.js with Sentry plugin
- [x] Task 5: Add environment variables
- [x] Task 6: Create test error route
- [x] Task 7: Write tests

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes

✅ **Sentry Package Installed**
- @sentry/nextjs package added to dependencies
- 132 packages installed as dependencies

✅ **Sentry Client Configuration**
- Created `sentry.client.config.ts` in project root
- DSN from NEXT_PUBLIC_SENTRY_DSN environment variable
- tracesSampleRate: 0.1 (10%)
- Session replay integration for error reproduction
- Browser tracing integration for performance
- Conditionally enabled (only when DSN configured or production)

✅ **Sentry Server Configuration**
- Created `sentry.server.config.ts` in project root
- DSN from SENTRY_DSN environment variable
- Prisma integration for database query monitoring
- tracesSampleRate: 0.1 (10%)

✅ **Sentry Edge Configuration**
- Created `sentry.edge.config.ts` for edge runtime
- Same configuration pattern as server

✅ **Next.js Integration**
- Updated `next.config.js` with withSentryConfig wrapper
- Source map uploads configured (widenClientFileUpload)
- Tunnel route at /monitoring for ad-blocker circumvention
- Automatic React component annotation
- Conditional wrapping (only when SENTRY_DSN configured)

✅ **Instrumentation Hook**
- Created `src/instrumentation.ts` for Next.js instrumentation
- Loads server config for nodejs runtime
- Loads edge config for edge runtime

✅ **Environment Variables**
- SENTRY_DSN for server-side (optional)
- NEXT_PUBLIC_SENTRY_DSN for client-side (optional)
- SENTRY_AUTH_TOKEN for source map uploads (optional)
- SENTRY_ORG and SENTRY_PROJECT for organization config (optional)
- Updated .env.example with documentation

✅ **Test Error Route**
- Created `/api/sentry-test` route
- Default: throws test error for automatic capture
- Manual mode: ?capture=manual for Sentry.captureException

✅ **Testing**
- 30 tests in tests/sentry.test.ts (all passing)
- Tests for configuration files, client/server/edge configs
- Tests for Next.js integration and instrumentation
- Tests for test route and environment variables

**Technical Details:**
- Sentry only initializes when DSN is configured
- Production builds include Sentry instrumentation
- Source maps uploaded automatically on build
- Error grouping works correctly

**Total Tests:** 105 passing, 2 skipped (107 total)

### File List

**Created:**
- sentry.client.config.ts
- sentry.server.config.ts
- sentry.edge.config.ts
- src/instrumentation.ts
- src/app/api/sentry-test/route.ts
- tests/sentry.test.ts

**Modified:**
- next.config.js (withSentryConfig wrapper)
- src/env.js (Sentry environment variables)
- .env.example (Sentry documentation)
- package.json / package-lock.json (@sentry/nextjs)
