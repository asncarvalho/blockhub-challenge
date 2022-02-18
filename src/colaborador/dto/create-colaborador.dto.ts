import { IsBoolean, IsDate, IsDateString, IsString } from 'class-validator';

export class CreateColaboradorDto {
  @IsString()
  nome: string;

  @IsString()
  cargo: string;

  @IsDateString()
  admissao: Date;

  @IsBoolean()
  ativo: boolean;
}
