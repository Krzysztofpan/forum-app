import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

export const authConfig = {
  providers: [], // Required by NextAuthConfig type
  callbacks: {
    authorized({ request, auth }: any) {
      const { pathname } = request.nextUrl

      // Wyjątki: pliki statyczne
      const isStaticFile =
        pathname.startsWith('/_next') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/fonts') ||
        pathname.startsWith('/homepage-bg')

      if (isStaticFile) return true // pozwól na dostęp

      const protectedPaths = [/\/home/, /\/[a-f0-9]{24}\/status\/[a-f0-9]{24}$/]
      const unprotectedPaths = [/\/$/, /\/login/, /\/sign-up/]

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
