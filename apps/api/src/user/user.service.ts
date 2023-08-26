import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { FaunaService, fql } from 'nestjs-fauna'
import { UserPayload, UserProvider } from './model/user.payload'
import { CreateUserInput, UpdateUserInput } from './model/user.input'
import { genSaltSync, hashSync } from 'bcryptjs'
import { EmailPasswordAuthInput } from 'src/auth/model/auth.input'
import { GithubOAuthData, GoogleOAuthData } from 'src/auth/model/auth.payload'

@Injectable()
export class UserService {
  constructor(private readonly faunaService: FaunaService) {}

  async assignNewPassword(password: string) {}

  async assignProvider(user: UserPayload, provider: UserProvider) {
    try {
      if (user.providers && !user.providers.includes(provider)) {
        // assign with the new provider
        const data: UpdateUserInput = {
          providers: [...user.providers, provider],
        }
        const query = fql`users.byId(${user.id})!.update(${data as any})`
        await this.faunaService.query<any>(query)
      }
    } catch (error) {
      throw new UnprocessableEntityException()
    }
  }

  securePassword(password: string): string {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt)

    return hashedPassword
  }

  generateUsernameFromEmail(email: string): string {
    return email.split('@')[0]
  }

  async findUserByEmail(email: string): Promise<UserPayload> {
    try {
      const query = fql`users.firstWhere(e => e.email == ${email})`
      const res = await this.faunaService.query<any>(query)
      return res.data
    } catch (error) {
      return
    }
  }

  async findUserById(userId: string): Promise<UserPayload> {
    try {
      const query = fql`users.byId(${userId})`
      const res = await this.faunaService.query<any>(query)
      return res.data
    } catch (error) {
      return
    }
  }

  async createNewUser(input: CreateUserInput): Promise<UserPayload> {
    try {
      const query = fql`users.create(${input as any})`
      const res = await this.faunaService.query<any>(query)
      return res.data
    } catch (error) {
      throw new UnprocessableEntityException()
    }
  }

  async signGoogleUser(input: GoogleOAuthData): Promise<UserPayload> {
    let user = await this.findUserByEmail(input.email)

    // check the user is already exists
    // if not let's create a new one
    if (user) {
      await this.assignProvider(user, 'google')
    } else {
      const newUser: CreateUserInput = {
        fullName: input.name,
        email: input.email,
        providers: ['google'],
        role: 'user',
        verified: false,
        username: this.generateUsernameFromEmail(input.email),
        avatar: input.picture,
      }

      user = await this.createNewUser(newUser)
    }

    return user
  }

  async signGithubUser(input: GithubOAuthData): Promise<UserPayload> {
    let user = await this.findUserByEmail(input.email)

    // check the user is already exists
    // if not let's create a new one
    if (user) {
      await this.assignProvider(user, 'github')
    } else {
      const newUser: CreateUserInput = {
        fullName: input.name,
        email: input.email,
        providers: ['github'],
        role: 'user',
        verified: false,
        username: this.generateUsernameFromEmail(input.email),
        avatar: input.avatar_url,
        location: input.location,
        bio: input.bio,
      }

      user = await this.createNewUser(newUser)
    }

    return user
  }

  async signEmailPassUser(input: EmailPasswordAuthInput): Promise<UserPayload> {
    let user = await this.findUserByEmail(input.email)
    if (!user) {
      // create new user
      const data: CreateUserInput = {
        email: input.email,
        username: this.generateUsernameFromEmail(input.email),
        providers: ['email-password'],
        role: 'user',
        verified: false,
        password: this.securePassword(input.password),
      }

      user = await this.createNewUser(data)
    } else {
      // udpate assign and even check password if needed
      // because of multiple providers
      await this.assignProvider(user, 'email-password')
      if (!user['password']) {
        await this.assignNewPassword(input.password)
      }
    }

    return user
  }

  async activateAccount(userId: string): Promise<void> {
    try {
      const input: UpdateUserInput = {
        verified: true,
      }

      const query = fql`users.byId(${userId})!.update(${input as any})`
      await this.faunaService.query<any>(query)
    } catch (error) {
      throw new UnprocessableEntityException()
    }
  }
}
