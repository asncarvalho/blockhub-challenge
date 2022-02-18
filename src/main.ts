import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blockhub-Challenge API')
    .setDescription(
      `
        Uma api contendo CRUD de projetos e colaboradores, utilizada para gestão de projetos.\n
        Para ter acesso a todos os endpoints da aplicação, primeiro crie um usuário, e depois faça
        a autenticação na rota /auth/login, logo depois de fazer a autenticação, é recebido um access_token, 
        utilize ele para autorizar os endpoints (Refresh de uma hora.).
      `,
    )
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Preencha seu token JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
