import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProjetosModule } from './projetos/projetos.module';
import { ColaboradorModule } from './colaborador/colaborador.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://devasnc:14d4rLqRpjMNouJc@cluster0.vykvv.mongodb.net/test',
    ),
    UsersModule,
    ProjetosModule,
    ColaboradorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
