import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    cors: true,
  });
  const configService = app.get<ConfigService>(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .addBearerAuth();
  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup(`api`, app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  await app.listen(configService.get<string>('PORT') || 3000);
}
bootstrap();
