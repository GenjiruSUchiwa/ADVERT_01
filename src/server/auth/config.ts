/* eslint-disable no-undef */
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type UserRole } from "../../../generated/prisma";

// Session durations
export const SESSION_MAX_AGE_DEFAULT = 86400; // 24 hours
export const SESSION_MAX_AGE_REMEMBER = 30 * 86400; // 30 days

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      tenantId: string;
      role: UserRole;
    };
  }

  interface User {
    tenantId?: string;
    role?: UserRole;
  }

  interface JWT {
    id?: string;
    tenantId?: string;
    role?: UserRole;
    rememberMe?: boolean;
  }
}

/**
 * Edge-compatible NextAuth.js v5 Configuration
 *
 * This config is safe to import in Edge Runtime (middleware).
 * It does NOT include providers or the Prisma adapter since those
 * require Node.js APIs (bcrypt, PrismaClient).
 *
 * The full config with providers is in ./index.ts.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  // Use JWT for sessions (better performance for MVP)
  // Default maxAge is 24h; "remember me" extends to 30 days via jwt callback
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE_DEFAULT,
  },

  // Custom pages
  pages: {
    signIn: "/login",
    error: "/auth/error",
    signOut: "/logout",
  },

  // Providers are added in the full config (./index.ts)
  providers: [],

  callbacks: {
    /**
     * JWT callback - adds user data to token
     * Called whenever a JWT is created or updated
     */
    jwt({ token, user, trigger, account }) {
      // On initial sign in, add user data to token
      if (user) {
        token.id = user.id;
        token.tenantId = user.tenantId;
        token.role = user.role;
      }

      // Handle "remember me" - set extended maxAge on initial sign in
      if (trigger === "signIn" && account) {
        // The rememberMe flag is passed as a credential
        // We store it on the token to adjust session maxAge
        const rememberMe = (account as Record<string, unknown>).rememberMe;
        if (rememberMe === "true") {
          token.rememberMe = true;
          // Set extended expiry: now + 30 days (in seconds)
          token.exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_REMEMBER;
        }
      }

      return token;
    },

    /**
     * Session callback - exposes token data to client
     * Called whenever session is accessed
     */
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.tenantId = token.tenantId as string;
        session.user.role = token.role as UserRole;
      }
      // Extend session maxAge for "remember me" sessions
      if (token.rememberMe) {
        (session as unknown as Record<string, unknown>).expires = new Date(
          Date.now() + SESSION_MAX_AGE_REMEMBER * 1000
        ).toISOString();
      }
      return session;
    },

    /**
     * Authorized callback - controls route access
     * Used by Next.js middleware for route protection
     */
    authorized({ auth: sessionAuth, request }) {
      const isLoggedIn = !!sessionAuth?.user;
      const { pathname } = request.nextUrl;

      // Protected routes that require authentication
      const protectedPaths = ["/dashboard"];
      const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

      // Auth pages that logged-in users should be redirected away from
      const authPaths = ["/login", "/register"];
      const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

      if (isProtected && !isLoggedIn) {
        // Redirect to login with callback URL
        const callbackUrl = encodeURIComponent(pathname);
        return Response.redirect(
          new URL(`/login?callbackUrl=${callbackUrl}`, request.nextUrl.origin)
        );
      }

      if (isAuthPage && isLoggedIn) {
        // Redirect logged-in users away from auth pages
        return Response.redirect(
          new URL("/dashboard", request.nextUrl.origin)
        );
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
