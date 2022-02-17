export class CreateProjetoDto {
  nome: string;
  descricao: string;
  inicio: Date;
  fim: Date;
  ativo: boolean;
  colaboradorId: string;
}
