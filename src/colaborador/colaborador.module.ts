import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Colaborador, ColaboradorSchema } from './entities/colaborador.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Colaborador.name, schema: ColaboradorSchema },
    ]),
  ],
  controllers: [ColaboradorController],
  providers: [ColaboradorService],
})
export class ColaboradorModule {}
