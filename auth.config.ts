import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

export const authConfig = {
  providers: [], // Required by NextAuthConfig type
  callbacks: {
    authorized({ request, auth }: any) {
      // Array of regex patterns of paths we want to protect
      const protectedPaths = [/\/home/, /\/[a-f0-9]{24}\/status\/[a-f0-9]{24}$/]
      const unprotectedPaths = [/\/$/, /\/login/, /\/sign-up/]
      // Get pathname from the req URL object
      const { pathname } = request.nextUrl

      // Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) {
        return NextResponse.redirect(request.nextUrl.origin + '/auth/login')
      }

      if (auth && unprotectedPaths.some((p) => p.test(pathname))) {
        return NextResponse.redirect(request.nextUrl.origin + '/home')
      }
      return true
    },
  },
} satisfies NextAuthConfig
