import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId, Types } from 'mongoose';
import { Colaborador } from 'src/colaborador/entities/colaborador.entity';

export type ProjetoDocument = Projeto & Document;

@Schema()
export class Projeto {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

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
