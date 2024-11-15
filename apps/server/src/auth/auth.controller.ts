import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserEntity } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login() {
        return this.authService.login();
    }

    @Get('check')
    @UseGuards(JwtAuthGuard)
    check(@User() user: UserEntity) {
        return user;
    }
}
