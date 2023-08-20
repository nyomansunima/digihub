import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { http } from '@nitric/sdk'

/**
 * Initializes the application and starts listening on the specified port.
 *
 * @param {number} port - The port number to listen on.
 * @return {Promise<void>} - A promise that resolves when the application is successfully started.
 */
async function bootstrap(port: number) {
  const app = await NestFactory.create(AppModule)
  await app.listen(port)
}

http(bootstrap)
