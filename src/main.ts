import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('CRUD Item')
    .setDescription(
      'The Item CRUD API is an interface that allows you to create, read, update and delete items. First, you need to create a user, log in, copy the generated access token and paste it into Authorize, and finally continue with the other endpoints. The access token is valid for 60 seconds, if you wish to change this value, change it in the code.',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('items')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
