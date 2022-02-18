import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedSwagger } from 'src/utils/swagger/unauthorized.swagger';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';

@Controller()
@ApiTags('Login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'logar na api' })
  @ApiResponse({
    status: 201,
    description: 'Login realizado com sucesso!',
  })
  @ApiResponse({
    status: 401,
    description: 'Não foi encontrado um usuário com esses registros',
    type: UnauthorizedSwagger,
  })
  async login(@Request() req: any, @Body() loginDto: LoginDTO) {
    return this.authService.login(req.user);
  }
}
