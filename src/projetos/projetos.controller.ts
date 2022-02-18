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
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProjetoSwagger } from './swagger/create-projeto.swagger';
import { BadRequestSwagger } from 'src/utils/swagger/bad-request.swagger';
import { UnauthorizedSwagger } from 'src/utils/swagger/unauthorized.swagger';
import { ConflictErrorSwagger } from 'src/utils/swagger/conflicterror.swagger';
import { IndexProjetoSwagger } from './swagger/index-projeto.swagger';
import { ShowProjetoSwagger } from './swagger/show-projeto.swagger';
import { NotFoundSwagger } from 'src/utils/swagger/not-found.swagger';
import { UpdateProjetoSwagger } from './swagger/update-projeto.swagger';

@Controller('projetos')
@ApiTags('Projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cadastrar um projeto' })
  @ApiResponse({
    status: 201,
    description: 'Novo projeto criado com sucesso!',
    type: CreateProjetoSwagger,
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
    description: 'Projeto com campo(nome) único já existente no banco de dados',
    type: ConflictErrorSwagger,
  })
  create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetosService.create(createProjetoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar todos os projetos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de projetos retornada com sucesso',
    type: IndexProjetoSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  findAll() {
    return this.projetosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Buscar um projeto' })
  @ApiResponse({
    status: 200,
    description: 'Dados do projeto retornados com sucesso!',
    type: ShowProjetoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Projeto não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  findOne(@Param('id') id: string) {
    return this.projetosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar um projeto' })
  @ApiResponse({
    status: 200,
    description: 'Projeto atualizado com sucesso',
    type: UpdateProjetoSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Projeto não encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Projeto com campo único existente',
    type: ConflictErrorSwagger,
  })
  update(@Param('id') id: string, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetosService.update(id, updateProjetoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Remover um projeto' })
  @ApiResponse({ status: 204, description: 'Projeto deletado com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Projeto não encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
    type: UnauthorizedSwagger,
  })
  remove(@Param('id') id: string) {
    return this.projetosService.remove(id);
  }
}
