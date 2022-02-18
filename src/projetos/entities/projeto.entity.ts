import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Colaborador } from 'src/colaborador/entities/colaborador.entity';

export type ProjetoDocument = Projeto & Document;

@Schema()
export class Projeto {
  @Prop({ unique: true, required: true })
  nome: string;

  @Prop()
  descricao: string;

  @Prop({ required: true })
  inicio: Date;

  @Prop()
  fim: Date;

  @Prop()
  ativo: boolean;

  @Prop({ type: [Types.ObjectId], ref: Colaborador.name })
  colaboradorId: Colaborador[];
}

export const ProjetoSchema = SchemaFactory.createForClass(Projeto);
