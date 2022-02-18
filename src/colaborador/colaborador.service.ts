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
    createColaboradorDto.admissao = new Date(createColaboradorDto.admissao);
    const newColaborador = new this.colaboradorModel(createColaboradorDto);
    return newColaborador.save();
  }

  findAll() {
    return this.colaboradorModel.find();
  }

  findOne(id: string) {
    return this.colaboradorModel.findById(id);
  }

  update(id: string, updateColaboradorDto: UpdateColaboradorDto) {
    return this.colaboradorModel.findByIdAndUpdate(
      { _id: id }, //Procurar o Objeto pelo id
      { $set: updateColaboradorDto }, //O que deseja alterar
      { new: true }, //Vai pegar as informações do objeto e alterar.
    );
  }

  remove(id: string) {
    return this.colaboradorModel.deleteOne({ _id: id }).exec();
  }
}
