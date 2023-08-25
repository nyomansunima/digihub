import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { settingConfiguration } from './config/setting.config'
import { FaunaModule } from 'nestjs-fauna'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { EmailModule } from './email/email.module'
import { UpstashRedisModule } from 'nestjs-upstash-redis'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [settingConfiguration],
    }),
    FaunaModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('database.fauna.secret'),
      }),
      inject: [ConfigService],
    }),
    UpstashRedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('database.redis.url'),
        token: configService.get<string>('database.redis.token'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    // TODO: Feature Module
    UserModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
