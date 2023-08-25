import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  EmailPasswordAuthInput,
  GithubAuthInput,
  GoogleAuthInput,
  VerifyUserEmailTokenInput,
} from './model/auth.input'
import { AuthPayload } from './model/auth.payload'
import { UserService } from '~/user/user.service'
import { UserPayload } from '~/user/model/user.payload'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { OAuthService } from './oauth.service'
import { EmailService } from '~/email/email.service'
import { UpstashRedisService } from 'nestjs-upstash-redis'
import { generateRandomString } from '~/utils/generate.utils'
import { UpdateUserInput } from '~/user/model/user.input'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly oauthService: OAuthService,
    private readonly emailService: EmailService,
    private readonly cacheService: UpstashRedisService,
  ) {}

  async generateNewToken(user: UserPayload): Promise<AuthPayload> {
    try {
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      }

      const refreshExp = this.configService.get<string>('auth.jwt.refreshExp')
      const accessExp = this.configService.get<string>('auth.jwt.accessExp')

      const accessToken = await this.jwtService.sign(payload, {
        expiresIn: accessExp,
      })

      const refreshToken = await this.jwtService.sign(payload, {
        expiresIn: refreshExp,
      })

      const decodedToken = await this.jwtService.decode(accessToken, {
        json: true,
      })

      return {
        accessToken,
        refreshToken,
        exp: decodedToken['exp'],
        iat: decodedToken['iat'],
      }
    } catch (error) {
      throw new InternalServerErrorException('auth/failed-token-generation', {
        cause: new Error(),
        description: 'Cannot generate new token',
      })
    }
  }

  async sendEmailVerification(user: UserPayload): Promise<void> {
    // only verify the user account
    // if the user isn't verified yet
    if (!user.verified) {
      const verificationCode = generateRandomString(6)

      // send email verification, then save the token in cache
      // so we can validate the token later
      await this.emailService.sendVerificationEmail(user, verificationCode)
      await this.cacheService.set(
        `${user.id}-verify-email-token`,
        verificationCode,
      )
    }
  }

  async verifyEmail(
    userId: string,
    input: VerifyUserEmailTokenInput,
  ): Promise<void> {
    try {
      // get the current code from cache, then compare to validate the same token
      const cachedVerificationCode = (await this.cacheService.get(
        `${userId}-verify-email-token`,
      )) as string

      if (input.verificationCode !== cachedVerificationCode) {
        throw new ForbiddenException('auth/invalid-email-token-code', {
          cause: new Error(),
          description:
            'Opps, your verification code is invalid. Please try again',
        })
      }

      // activate the account after all
      await this.userService.activateAccount(userId)
      await this.cacheService.del(`${userId}-verify-email-token`)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async resendEmailVerification(userId: string): Promise<void> {
    const user = await this.userService.findUserById(userId)
    await this.sendEmailVerification(user)
  }

  async googleAuth(input: GoogleAuthInput): Promise<AuthPayload> {
    const googleUser = await this.oauthService.retrieveGoogleUser(input)
    const user = await this.userService.signGoogleUser(googleUser)
    await this.sendEmailVerification(user)
    const token = await this.generateNewToken(user)

    return token
  }

  async githubAuth(input: GithubAuthInput): Promise<AuthPayload> {
    const githubUser = await this.oauthService.retrieveGithubUser(input)
    const user = await this.userService.signGithubUser(githubUser)
    await this.sendEmailVerification(user)
    const token = await this.generateNewToken(user)

    return token
  }

  async emailPasswordAuth(input: EmailPasswordAuthInput): Promise<AuthPayload> {
    const user = await this.userService.signEmailPassUser(input)
    await this.sendEmailVerification(user)
    const token = await this.generateNewToken(user)

    return token
  }
}
