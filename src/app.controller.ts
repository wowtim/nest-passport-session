import { Controller, Get, Request, Post, UseGuards, Session } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';


@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Session() session) {
    let token = await this.authService.login(req.user);
    
    session['passport'] = token;
    console.log(req.session);
    return token;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req, @Session() session) {
    
    return req.user;
  }
}
