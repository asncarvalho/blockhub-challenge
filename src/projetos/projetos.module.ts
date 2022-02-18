import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Projeto, ProjetoSchema } from './entities/projeto.entity';
import {
  Colaborador,
  ColaboradorSchema,
} from 'src/colaborador/entities/colaborador.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Projeto.name, schema: ProjetoSchema },
      { name: Colaborador.name, schema: ColaboradorSchema },
    ]),
  ],
  controllers: [ProjetosController],
  providers: [ProjetosService],
})
export class ProjetosModule {}
