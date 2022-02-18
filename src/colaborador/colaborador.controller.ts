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
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserSwagger } from 'src/users/swagger/create-user.swagger';
import { BadRequestSwagger } from 'src/utils/swagger/bad-request.swagger';
import { ConflictErrorSwagger } from 'src/utils/swagger/conflicterror.swagger';
import { UnauthorizedSwagger } from 'src/utils/swagger/unauthorized.swagger';
import { IndexColaboradorSwagger } from './swagger/index-colaborador.swagger';
import { ShowColaboradorSwagger } from './swagger/show-colaborador.swagger';
import { NotFoundSwagger } from 'src/utils/swagger/not-found.swagger';
import { UpdateColaboradorSwagger } from './swagger/update-user.swagger';

@Controller('colaborador')
@ApiTags('Colaboradores')
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  //Create
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cadastrar um colaborador' })
  @ApiResponse({
    status: 201,
    description: 'Novo colaborador criado com sucesso!',
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
  create(@Body() createColaboradorDto: CreateColaboradorDto) {
    return this.colaboradorService.create(createColaboradorDto);
  }

  //GetAll
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os colaboradores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de colaboradores retornada com sucesso',
    type: IndexColaboradorSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  findAll() {
    return this.colaboradorService.findAll();
  }

  //Findone
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Buscar um colaborador' })
  @ApiResponse({
    status: 200,
    description: 'Dados do colaborador retornados com sucesso!',
    type: ShowColaboradorSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Colaborador não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  findOne(@Param('id') id: string) {
    return this.colaboradorService.findOne(id);
  }

  //Update
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar um colaborador' })
  @ApiResponse({
    status: 200,
    description: 'Colaborador atualizado com sucesso',
    type: UpdateColaboradorSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Colaborador não encontrado',
    type: NotFoundSwagger,
  })
  update(
    @Param('id') id: string,
    @Body() updateColaboradorDto: UpdateColaboradorDto,
  ) {
    return this.colaboradorService.update(id, updateColaboradorDto);
  }

  //DELETE ROUTE
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Remover um colaborador' })
  @ApiResponse({ status: 204, description: 'Colaborador deletado com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Colaborador Usuário não encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  remove(@Param('id') id: string) {
    return this.colaboradorService.remove(id);
  }
}
