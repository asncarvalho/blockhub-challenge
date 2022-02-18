import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsString } from 'class-validator';

export class CreateColaboradorDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsString()
  @ApiProperty()
  cargo: string;

  @IsDateString()
  @ApiProperty()
  admissao: Date;

  @IsBoolean()
  @ApiProperty()
  ativo: boolean;
}
