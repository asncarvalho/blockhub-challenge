import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProjetoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsDateString()
  inicio: Date;

  @IsDateString()
  fim: Date;

  @IsBoolean()
  ativo: boolean;

  @IsMongoId({ each: true })
  colaboradorId: Types.ObjectId[];
}
