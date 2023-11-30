import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login') // 用户登录
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register') // 用户注册
  async resgister(@Body() user: User) {
    return this.authService.register(user);
  }
}
