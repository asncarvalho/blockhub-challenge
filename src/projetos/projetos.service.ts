import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto, ProjetoDocument } from './entities/projeto.entity';

@Injectable()
export class ProjetosService {
  constructor(
    @InjectModel(Projeto.name) private projetoModel: Model<ProjetoDocument>,
  ) {}

  async create(createProjetoDto: CreateProjetoDto) {
    const { nome } = createProjetoDto;
    const { inicio } = createProjetoDto;
    const { fim } = createProjetoDto;

    createProjetoDto.inicio = new Date(inicio);
    createProjetoDto.fim = new Date(fim);

    if (await this.projectExists(nome)) {
      throw new ConflictException('Nome já existe!');
    } else {
      const newProjeto = new this.projetoModel(createProjetoDto);
      return newProjeto.save();
    }
  }

  findAll() {
    return this.projetoModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} projeto`;
  }

  update(id: number, updateProjetoDto: UpdateProjetoDto) {
    return `This action updates a #${id} projeto`;
  }

  remove(id: number) {
    return `This action removes a #${id} projeto`;
  }

  async projectExists(name: string): Promise<any> {
    const projeto = await this.projetoModel.findOne({ nome: name });
    console.log(projeto);
    if (projeto != null) {
      return true;
    } else {
      return false;
    }
  }
}
