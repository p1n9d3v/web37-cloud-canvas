import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login() {
        return this.authService.login();
    }

    @UseGuards(JwtAuthGuard)
    @Get('check')
    check(@Req() req: Request) {
        return req.user;
    }
}
