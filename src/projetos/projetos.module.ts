import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Projeto, ProjetoSchema } from './entities/projeto.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Projeto.name, schema: ProjetoSchema }]),
  ],
  controllers: [ProjetosController],
  providers: [ProjetosService],
})
export class ProjetosModule {}
