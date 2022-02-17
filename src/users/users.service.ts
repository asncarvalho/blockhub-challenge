import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;

    const userExists = await this.existsByUsername(username);

    if (userExists) {
      throw new ConflictException('Username already exists!');
    } else {
      const newuser = new this.userModel(createUserDto);
      newuser.save();
    }
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      { _id: id }, //Procurar o Objeto pelo id
      { $set: updateUserDto }, //O que deseja alterar
      { new: true }, //Vai pegar as informações do objeto e alterar.
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

  async existsByUsername(usrname: string): Promise<any> {
    const user = await this.userModel.exists({ username: usrname });
    if (user != null) {
      return true;
    } else return false;
  }
}
