import { Controller, Request, Post, UseGuards, Res } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import * as cookieParser from 'cookie-parser';
import { Response } from 'express';
import { environment } from './environment';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    let result = await this.authService.login(req.user);
    response.cookie(environment.token_key, result.access_token, {
      httpOnly: true,
      domain: "auth.wisenoob.com",
      secure: false
    })
    response.cookie(environment.token_key, result.access_token, {
      httpOnly: true,
      domain: "wisenoob.com",
      secure: false
    })
    response.cookie(environment.token_key, result.access_token, {
      httpOnly: true,
      domain: "localhost",
      secure: false
    })
    return result
  }
}