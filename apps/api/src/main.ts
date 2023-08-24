import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { http } from '@nitric/sdk'
import { ValidationPipe } from '@nestjs/common'
import * as compression from 'compression'
import helmet from 'helmet'

/**
 * Initializes the application and starts listening on the specified port.
 *
 * @param {number} port - The port number to listen on.
 * @return {Promise<void>} - A promise that resolves when the application is successfully started.
 */
async function bootstrap(port: number) {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  app.use(compression())
  app.use(helmet())
  app.enableCors({
    origin: '*',
  })

  await app.listen(port)
}

http(bootstrap)
