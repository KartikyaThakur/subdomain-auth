import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import { environment } from './environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: environment.allowed_origins
    }
  });
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'views'))
  app.enableCors()
  await app.listen(3001);
}
bootstrap();
