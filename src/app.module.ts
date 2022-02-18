import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProjetosModule } from './projetos/projetos.module';
import { ColaboradorModule } from './colaborador/colaborador.module';

import * as dotenv from 'dotenv';
dotenv.config();
const mongoAccess: string = process.env.MONGODBCONN;

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(mongoAccess),
    UsersModule,
    ProjetosModule,
    ColaboradorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
