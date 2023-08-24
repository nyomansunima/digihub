import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    if (err) {
      throw err
    }

    if (!user) {
      throw new UnauthorizedException('auth/authentication-need', {
        cause: new Error(),
        description: 'Please signin before use this resources',
      })
    }

    return user
  }
}
