import NextAuth from 'next-auth/next'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
    issueAt: number
    expiredAt: number
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken: string
    refreshToken: string
    issueAt: number
    expiredAt: number
    user: {
      id: string
      email: string
      username: string
      providers: string[]
      avatar?: string
      fullName?: string
      verified: boolean
      role: string
    }
  }

  interface User {
    accessToken: string
    refreshToken: string
    issueAt: number
    expiredAt: number
  }
}
