import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Modules from './module-list';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<ConfigService>(ConfigService);

  Modules.forEach((x) => {
    const options = new DocumentBuilder()
      .setTitle(`${x.name.replace(/^./, (str) => str.toUpperCase())} API`)
      .setVersion('1.0')
      .addTag(x.name);
    if (!x.public) {
      options.addBearerAuth();
    }
    const document = SwaggerModule.createDocument(app, options.build(), {
      include: [x.module],
    });
    SwaggerModule.setup(`api-${x.name}`, app, document);
  });

  await app.listen(configService.get<string>('PORT') || 3000);
}
bootstrap();
