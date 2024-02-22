import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
        .setTitle('RxPM API')
        .setDescription('RxPM API description')
        .setVersion('1.0')
        .addTag('areas')
        .setSchemes('http','https')
        .addBearerAuth()
        .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apidocs', app, document);

  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();
  await app.listen(process.env.SM_API_PORT); // 3000);
}
bootstrap();
