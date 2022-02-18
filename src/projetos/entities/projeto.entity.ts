import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Colaborador } from 'src/colaborador/entities/colaborador.entity';

export type ProjetoDocument = Projeto & Document;

@Schema()
export class Projeto {
  @Prop({ unique: true, required: true })
  @ApiProperty()
  nome: string;

  @Prop()
  @ApiProperty()
  descricao: string;

  @Prop({ required: true })
  @ApiProperty()
  inicio: Date;

  @Prop()
  @ApiProperty()
  fim: Date;

  @Prop()
  @ApiProperty()
  ativo: boolean;

  @Prop({ type: [Types.ObjectId], ref: Colaborador.name })
  @ApiProperty()
  colaboradorId: Colaborador[];
}

export const ProjetoSchema = SchemaFactory.createForClass(Projeto);
