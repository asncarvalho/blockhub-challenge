import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ColaboradorController } from 'src/colaborador/colaborador.controller';
import {
  Colaborador,
  ColaboradorDocument,
} from 'src/colaborador/entities/colaborador.entity';
import Utils from 'src/utils/utils';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto, ProjetoDocument } from './entities/projeto.entity';

@Injectable()
export class ProjetosService {
  constructor(
    @InjectModel(Projeto.name) private projetoModel: Model<ProjetoDocument>,
  ) {}

  async create(createProjetoDto: CreateProjetoDto) {
    createProjetoDto.inicio = new Date(createProjetoDto.inicio);
    createProjetoDto.fim = new Date(createProjetoDto.fim);

    if (await this.checkDatesProject(createProjetoDto)) {
      throw new BadRequestException(
        'Um ou mais colaboradores já estam em um projeto no período de tempo informado.',
      );
    }

    if (await this.projectExists(createProjetoDto.nome)) {
      throw new ConflictException('Nome já existe!');
    } else {
      const newProjeto = await new this.projetoModel(createProjetoDto);
      return newProjeto.save();
    }
  }

  findAll() {
    return this.projetoModel.find();
  }

  findOne(id: string) {
    return this.projetoModel.findById(id);
  }

  async update(id: string, updateProjetoDto: UpdateProjetoDto) {
    updateProjetoDto.inicio = new Date(updateProjetoDto.inicio);
    updateProjetoDto.fim = new Date(updateProjetoDto.fim);

    const { inicio, fim } = await this.projetoModel.findById(id);
    const { colaboradorId } = await this.projetoModel.findById(id);
    const { alt_inicio }: any = updateProjetoDto.inicio;
    const { alt_fim }: any = updateProjetoDto.fim;
    const { alt_colaboradorId }: any = updateProjetoDto.colaboradorId;

    if (inicio != alt_inicio || fim != alt_fim) {
      if (await this.checkDatesProject(updateProjetoDto)) {
        throw new BadRequestException(
          'Um ou mais colaboradores já estam em um projeto no período de tempo informado.',
        );
      }
    }

    if (await this.projectExists(updateProjetoDto.nome)) {
      throw new ConflictException('Nome já existe!');
    } else {
    }

    return `This action updates a #${id} projeto`;
  }

  remove(id: string) {
    return `This action removes a #${id} projeto`;
  }

  async projectExists(name: string): Promise<Boolean> {
    const projeto = await this.projetoModel.exists({ nome: name });
    if (projeto != null) return true;
    else return false;
  }

  async checkDatesProject(projetoDto: CreateProjetoDto | UpdateProjetoDto) {
    const startDate = projetoDto.inicio;
    const endDate = projetoDto.fim;

    const test = await this.projetoModel.find({
      colaboradorId: projetoDto.colaboradorId,
    });

    const { colaboradorId } = projetoDto;

    for (const iterator of colaboradorId) {
      for await (const element of this.projetoModel.find({
        colaboradorId: { $all: iterator },
      })) {
        /**
         * Use case 1: start date and end date are between last project: Check 👍
         * Use case 2: period between both are contain: Check 👍
         * Use case 3: Having a past project, and future project: CHECK! 👍👍👍👍👍
         */
        const start: Date = element.inicio;
        const end: Date = element.fim;

        //Use case 1,3
        if (
          (startDate >= start && startDate <= end) ||
          (endDate >= start && endDate <= end)
        )
          return true;

        //Use case 2
        if (startDate <= start && endDate >= end) return true;
      }
    }
    return false;
  }
}
