import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import connectionToDatabase from './lib/mongoose'

import { comparePassword } from './lib/utils/bcryptUtils'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import client from './lib/dbclient'
import type { DefaultSession } from 'next-auth'
import type {} from 'next-auth/jwt'
import User from './models/User'
import { prisma } from './prisma'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
    access_token?: string
  }

  interface User {
    id: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    access_token?: string
  }
}

const config = {
  pages: {
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null

        /* const user = await User.findOne({
          email: credentials?.email,
        }).select('+password') */

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
          select: { id: true, email: true, password: true, username: true },
        })

        if (!user) throw new Error('Wrong Email')
        const passwordMatch = await comparePassword(
          credentials.password as string,
          user.password
        )
        if (!passwordMatch) throw new Error('Wrong Password')

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        }
      },
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user && user.id) {
        token.id = user.id
      }
      if (account && account.access_token) {
        token.access_token = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.access_token = token.access_token

      return session
    },

    ...authConfig,
  },
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)
