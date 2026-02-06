import NextAuth from "next-auth";
import { cache } from "react";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "../../../generated/prisma";

import { authConfig } from "./config";

// Create a separate Prisma client for auth (without tenant RLS)
// Auth operations need to query users across all tenants for login
const prisma = new PrismaClient();

/**
 * Full NextAuth configuration with Node.js-only providers and adapter.
 * Extends the Edge-compatible base config from ./config.ts.
 */
const {
  auth: uncachedAuth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  // Prisma adapter for user/session persistence
  adapter: PrismaAdapter(prisma),

  // Add the Credentials provider (requires Node.js for bcrypt)
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            passwordHash: true,
            tenantId: true,
            role: true,
            image: true,
          },
        });

        if (!user || !user.passwordHash) {
          // Log failed login attempt (email not found)
          // Use generic message - don't reveal whether email exists
          console.log(
            `[AUTH] Failed login attempt for email: ${email} at ${new Date().toISOString()}`
          );
          return null;
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isValidPassword) {
          // Log failed login attempt (wrong password)
          console.log(
            `[AUTH] Failed login attempt for user: ${user.id} at ${new Date().toISOString()}`
          );
          return null;
        }

        // Return user object (without passwordHash)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          tenantId: user.tenantId,
          role: user.role,
        };
      },
    }),
  ],
});

// Cached version for Server Components (avoid duplicate DB calls in same render)
const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
