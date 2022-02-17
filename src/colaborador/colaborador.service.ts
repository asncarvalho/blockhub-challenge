import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import {
  Colaborador,
  ColaboradorDocument,
} from './entities/colaborador.entity';

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectModel(Colaborador.name)
    private colaboradorModel: Model<ColaboradorDocument>,
  ) {}

  create(createColaboradorDto: CreateColaboradorDto) {
    const newColaborador = new this.colaboradorModel(createColaboradorDto);
    return newColaborador.save();
  }

  findAll() {
    return this.colaboradorModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} colaborador`;
  }

  update(id: string, updateColaboradorDto: UpdateColaboradorDto) {
    return `This action updates a #${id} colaborador`;
  }

  remove(id: string) {
    return `This action removes a #${id} colaborador`;
  }
}
