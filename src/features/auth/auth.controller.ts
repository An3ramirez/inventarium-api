import { Controller, Post, UseGuards, HttpCode, Req, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInDto } from './dto/signin.dto';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
@ApiTags('Authenticación')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: SignInDto })
  signIn(@Req() request: RequestWithUser) {
    return this.authService.getAccessToken(request.user);
  }
}
