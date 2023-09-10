import { Injectable } from '@nestjs/common'
import { VerifyEmailTemplate } from '@templates/emails/verify-email'
import { CreateEmailOptions, ResendService } from 'nestjs-resend'
import * as React from 'react'
import { UserPayload } from 'src/user/model/user.payload'

@Injectable()
export class EmailService {
  constructor(private readonly resendService: ResendService) {}

  async sendVerificationEmail(
    user: UserPayload,
    verificationCode: string,
  ): Promise<void> {
    try {
      const payload: CreateEmailOptions = {
        from: 'verify@sonibble.com',
        to: user.email,
        subject: 'Activate DigiHub Account',
        react: React.createElement(VerifyEmailTemplate, {
          fullName: user.fullName,
          verificationCode: verificationCode,
        }),
      }

      await this.resendService.send(payload)
    } catch (error) {}
  }
}
