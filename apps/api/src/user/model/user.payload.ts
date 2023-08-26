import { OmitType } from '@nestjs/mapped-types'

export type UserRole = 'user' | 'admin'
export type UserProvider = 'google' | 'github' | 'email-password'

export class User {
  email: string
  username: string
  fullName?: string
  avatar?: string
  password?: string
  role: UserRole
  providers: UserProvider[]
  location?: string
  phoneNumber?: string
  bio?: string
  verified: boolean
}

export class UserPayload extends OmitType(User, ['password'] as const) {
  id: string
}
