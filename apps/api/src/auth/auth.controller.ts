import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import {
  EmailPasswordAuthInput,
  GithubAuthInput,
  GoogleAuthInput,
  VerifyUserEmailTokenInput,
} from './model/auth.input'
import { AuthPayload } from './model/auth.payload'
import { JwtAuthGuard } from './jwt-auth.guard'
import { Request } from 'express'

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

  @UseGuards(JwtAuthGuard)
  @Post('/email-verification')
  async verifyEmail(
    @Req() req: Request,
    @Body() input: VerifyUserEmailTokenInput,
  ): Promise<void> {
    const user = req.user as any
    return this.authService.verifyEmail(user.id, input)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/resend-email-verification')
  async resendEmailVerification(@Req() req: Request): Promise<void> {
    const user = req.user as any
    return this.authService.resendEmailVerification(user.id)
  }
}
