import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import { ShowUserSwagger } from './swagger/show-user.swagger';
import { UpdateUserSwagger } from './swagger/update-user.swagger';
import { BadRequestSwagger } from 'src/utils/swagger/bad-request.swagger';
import { ConflictErrorSwagger } from 'src/utils/swagger/conflicterror.swagger';
import { UnauthorizedSwagger } from 'src/utils/swagger/unauthorized.swagger';
import { NotFoundSwagger } from 'src/utils/swagger/not-found.swagger';

@Controller('users')
@ApiTags('Usuários')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Create
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cadastrar um usuário' })
  @ApiResponse({
    status: 201,
    description: 'Novo usuário criado com sucesso!',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário com campo único existente',
    type: ConflictErrorSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //ListAll
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: IndexUserSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  findAll() {
    return this.usersService.findAll();
  }

  //FindOne
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Buscar um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Dados do Usuário retornado com sucesso!',
    type: ShowUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  //Update -> Patch
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UpdateUserSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário com campo único existente',
    type: ConflictErrorSwagger,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  //RemoveOne -> DELETE
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Usuário Usuário não encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
