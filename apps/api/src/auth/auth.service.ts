import { Injectable, InternalServerErrorException } from '@nestjs/common'
import {
  EmailPasswordAuthInput,
  GithubAuthInput,
  GoogleAuthInput,
} from './model/auth.input'
import { AuthPayload } from './model/auth.payload'
import { UserService } from 'src/user/user.service'
import { UserPayload } from 'src/user/model/user.payload'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { OAuthService } from './oauth.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly oauthService: OAuthService,
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

  async googleAuth(input: GoogleAuthInput): Promise<AuthPayload> {
    const googleUser = await this.oauthService.retrieveGoogleUser(input)
    const user = await this.userService.signGoogleUser(googleUser)
    const token = await this.generateNewToken(user)

    return token
  }

  async githubAuth(input: GithubAuthInput): Promise<AuthPayload> {
    const githubUser = await this.oauthService.retrieveGithubUser(input)
    const user = await this.userService.signGithubUser(githubUser)
    const token = await this.generateNewToken(user)

    return token
  }

  async emailPasswordAuth(input: EmailPasswordAuthInput): Promise<AuthPayload> {
    const user = await this.userService.signEmailPassUser(input)
    const token = await this.generateNewToken(user)

    return token
  }
}
