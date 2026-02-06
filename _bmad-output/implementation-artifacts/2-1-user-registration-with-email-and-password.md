# Story 2.1: User Registration with Email and Password

## Story

As an **unregistered user**,
I want **to create an account using my email and password**,
So that **I can access ADVERT and start creating brand strategies**.

## Status

✅ Complete

## Acceptance Criteria

1. **AC1: Registration Form UI**
   - Page at `/register`
   - Fields: Email, Full name, Password, Confirm password, Company name (optional)
   - "Create Account" button
   - Link to login page

2. **AC2: Password Requirements**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - Show/hide password toggle
   - Password strength indicator

3. **AC3: Registration Logic**
   - Validate email uniqueness
   - Validate password match
   - Hash password with bcrypt (work factor 12)
   - Create new Tenant record
   - Create new User as AGENCY_OWNER
   - Generate tenant slug from company name or email

4. **AC4: Post-Registration**
   - Auto-login after successful registration
   - Redirect to /dashboard
   - Send welcome email via Resend

5. **AC5: Error Handling**
   - "Email already exists" error
   - "Passwords do not match" error
   - "Password requirements not met" error
   - Toast notifications for errors
   - Preserve form data (except passwords) on error

6. **AC6: Security**
   - Rate limiting (5 attempts per hour per IP)
   - Never log sensitive data
   - Zod schema validation

## Technical Notes

- Use tRPC mutation for registration API
- Use react-hook-form with zod validation
- Use shadcn/ui form components
- Welcome email template already created in Epic 1

## Tasks

- [x] Task 1: Create registration page UI
- [x] Task 2: Implement password validation and strength indicator
- [x] Task 3: Create tRPC registration mutation
- [x] Task 4: Implement tenant and user creation logic
- [x] Task 5: Add auto-login after registration
- [x] Task 6: Create and send welcome email
- [x] Task 7: Write tests

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

All acceptance criteria met:
- Registration form at `/register` with email, full name, password, confirm password, company name
- Password strength indicator with real-time validation (8+ chars, uppercase, lowercase, number)
- Show/hide password toggle on both password fields
- tRPC `auth.register` mutation with bcrypt hashing (work factor 12)
- Tenant + User creation in Prisma transaction (user gets AGENCY_OWNER role)
- Auto-login after registration via NextAuth signIn()
- Welcome email sent via Resend with React Email template
- Login page at `/login` with credentials form
- Dashboard page at `/dashboard` with session display
- Zod schema validation on both client and server
- 204 tests passing, build succeeds

### File List

- `src/server/api/routers/auth.ts` - Auth router with register mutation
- `src/server/api/root.ts` - Updated to include auth router
- `src/pages/register.tsx` - Registration page with form and password strength
- `src/pages/login.tsx` - Login page with credentials form
- `src/pages/dashboard.tsx` - Dashboard placeholder with session info
- `src/lib/email/templates/welcome.tsx` - Welcome email React template
- `src/lib/email/templates/index.ts` - Updated template exports
- `tests/registration.test.ts` - Registration unit tests
