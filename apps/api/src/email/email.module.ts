import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ResendModule } from 'nestjs-resend'
import { EmailService } from './email.service'

@Global()
@Module({
  imports: [
    ResendModule.forAsyncRoot({
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('email.resend.apiKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
