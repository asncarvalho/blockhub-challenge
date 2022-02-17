import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';

export type ColaboradorDocument = Colaborador & Document;

@Schema()
export class Colaborador {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cargo: string;

  @Prop({ required: true })
  admissao: Date;

  @Prop()
  ativo: boolean;
}

export const ColaboradorSchema = SchemaFactory.createForClass(Colaborador);
