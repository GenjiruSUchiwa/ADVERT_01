# Story 2.3: Password Reset via Email Link

## Story

As a **user who forgot their password**,
I want **to reset my password via email link**,
So that **I can regain access to my account securely**.

## Status

✅ Complete

## Acceptance Criteria

1. **AC1: Forgot Password Page** - `/auth/forgot-password` with email input
2. **AC2: Token Generation** - 32-byte random hex token, SHA-256 hashed before DB storage
3. **AC3: Reset Email** - Sent via Resend with reset link, 1-hour expiry warning
4. **AC4: Anti-enumeration** - Same success message for existing/non-existing emails
5. **AC5: Reset Password Page** - `/auth/reset-password?token=...` with password form
6. **AC6: Password Update** - Validates token, hashes new password (bcrypt 12), deletes token
7. **AC7: Post-Reset** - Success message, redirect to login, sessions invalidated
8. **AC8: Expired Token** - Error message with link to request new one
9. **AC9: Used Token** - Single-use tokens deleted after successful reset
10. **AC10: Token Invalidation** - Previous tokens deleted when new one requested
11. **AC11: Confirmation Email** - "Your password was changed" email sent after reset

## Tasks

- [x] Task 1: Create password reset email template (React Email)
- [x] Task 2: Create password changed confirmation email template
- [x] Task 3: Add requestPasswordReset tRPC mutation
- [x] Task 4: Add resetPassword tRPC mutation
- [x] Task 5: Create forgot-password page with success state
- [x] Task 6: Create reset-password page with token validation
- [x] Task 7: Update login page forgot-password link
- [x] Task 8: Write tests (48 tests)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

Full password reset flow implemented:
- Cryptographic token generation (32-byte random, SHA-256 hashed for storage)
- Tokens stored in VerificationToken table with 1-hour expiry
- Previous tokens invalidated when new one requested
- Token verified by hashing provided token and comparing with stored hash
- Password updated in transaction with token deletion and session invalidation
- Two email templates: reset request and password changed confirmation
- Anti-enumeration: identical response for existing and non-existing emails
- All reset attempts logged for security audit
- 275 tests passing, build succeeds

### File List

- `src/server/api/routers/auth.ts` - Added requestPasswordReset & resetPassword mutations
- `src/lib/email/templates/password-reset.tsx` - Password reset email template
- `src/lib/email/templates/password-changed.tsx` - Password changed confirmation template
- `src/lib/email/templates/index.ts` - Updated exports
- `src/pages/auth/forgot-password.tsx` - Forgot password page with success state
- `src/pages/auth/reset-password.tsx` - Reset password page with token validation
- `src/pages/login.tsx` - Updated forgot-password link to `/auth/forgot-password`
- `tests/password-reset.test.ts` - Password reset tests (48 tests)
- `tests/registration.test.ts` - Updated forgot-password link in test
