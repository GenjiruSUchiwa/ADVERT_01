# Story 2.2: User Login with Credentials and Session Management

## Story

As a **registered user**,
I want **to log in with my email and password**,
So that **I can access my account and strategies securely**.

## Status

✅ Complete

## Acceptance Criteria

1. **AC1: Login Form UI**
   - Page at `/login` with email and password fields
   - "Remember me" checkbox (extends session to 30 days)
   - "Forgot password?" link
   - "Don't have an account? Sign up" link
   - Show/hide password toggle

2. **AC2: Login Logic**
   - NextAuth Credentials provider with bcrypt.compare()
   - JWT session with user.id, email, tenantId, role
   - Default session: 24 hours; Remember me: 30 days
   - Generic "Invalid email or password" error (prevents email enumeration)

3. **AC3: Route Protection via Middleware**
   - Next.js middleware using Edge-compatible auth config
   - `/dashboard` requires authentication (redirects to `/login?callbackUrl=...`)
   - `/login` and `/register` redirect authenticated users to `/dashboard`
   - Callback URL preserved through login flow

4. **AC4: Session Expiry Handling**
   - Session expired message shown when `?expired=true` query param present
   - Login page displays "Session expired. Please log in again."

5. **AC5: Security**
   - Failed login attempts logged with timestamp
   - Error messages don't reveal whether email exists
   - Passwords never logged or exposed in errors
   - Edge-compatible config split (no Node.js deps in middleware)

## Tasks

- [x] Task 1: Split auth config into Edge-compatible base + Node.js full config
- [x] Task 2: Add "Remember me" support with extended JWT expiry
- [x] Task 3: Update login page with checkbox, callbackUrl, session expired msg
- [x] Task 4: Create Next.js middleware for route protection
- [x] Task 5: Add failed login attempt logging
- [x] Task 6: Simplify dashboard (middleware handles auth redirect)
- [x] Task 7: Add shadcn checkbox component
- [x] Task 8: Write login tests (23 tests)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

Split auth config into Edge-compatible base (`config.ts`) and full Node.js config
(`index.ts`). The base config contains JWT/session callbacks and the `authorized`
callback for middleware route protection. The full config adds PrismaAdapter,
Credentials provider with bcrypt, and failed login attempt logging.

Key architecture decisions:
- Edge/Node split avoids PrismaClient and bcrypt in middleware (Edge Runtime)
- "Remember me" extends JWT exp to 30 days via token.rememberMe flag
- Middleware handles redirects: unauthenticated → login, authenticated → dashboard
- Dashboard no longer does client-side redirect (middleware handles it)

Build succeeds with middleware at 133 kB. All 227 tests pass.

### File List

- `src/server/auth/config.ts` - Edge-compatible base auth config (callbacks, authorized)
- `src/server/auth/index.ts` - Full auth config with Credentials provider + PrismaAdapter
- `src/middleware.ts` - Next.js middleware for route protection
- `src/pages/login.tsx` - Updated with Remember Me, callbackUrl, session expired message
- `src/pages/dashboard.tsx` - Simplified (middleware handles auth redirect)
- `src/components/ui/checkbox.tsx` - shadcn checkbox component
- `tests/login.test.ts` - Login tests (23 tests)
- `tests/registration.test.ts` - Updated test for new dashboard behavior
