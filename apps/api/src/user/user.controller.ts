import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserPayload } from './model/user.payload'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async userFromCredential(@Req() req: Request): Promise<UserPayload> {
    const user = req.user as any
    return this.userService.findUserByEmail(user.email)
  }
}
