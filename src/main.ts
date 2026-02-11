import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { configureApp } from './config/app.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  configureApp(app);

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
  logger.log(`📚 Swagger UI: http://localhost:${port}/api/docs`);
}

bootstrap();
