import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import {
  EmailPasswordAuthInput,
  GithubAuthInput,
  GoogleAuthInput,
} from './model/auth.input'
import { AuthPayload } from './model/auth.payload'

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/google')
  async googleAuth(@Body() input: GoogleAuthInput): Promise<AuthPayload> {
    return this.authService.googleAuth(input)
  }

  @Post('/github')
  async githubAuth(@Body() input: GithubAuthInput): Promise<AuthPayload> {
    return this.authService.githubAuth(input)
  }

  @Post('/email-password')
  async emailPasswordAuth(
    @Body() input: EmailPasswordAuthInput,
  ): Promise<AuthPayload> {
    return this.authService.emailPasswordAuth(input)
  }
}
