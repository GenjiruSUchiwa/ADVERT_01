import NextAuth from "next-auth";
import { authConfig } from "~/server/auth/config";

// Use the Edge-compatible auth config (no PrismaClient, no bcrypt)
// The authorized callback in config.ts handles route protection
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Match protected and auth routes
  // Skip API routes, static files, and public assets
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
