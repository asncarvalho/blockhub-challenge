import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProjetoDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsString()
  @ApiProperty()
  descricao: string;

  @IsDateString()
  @ApiProperty()
  inicio: Date;

  @IsDateString()
  @ApiProperty()
  fim: Date;

  @IsBoolean()
  @ApiProperty()
  ativo: boolean;

  @IsMongoId({ each: true })
  @ApiProperty()
  colaboradorId: Types.ObjectId[];
}
