import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    @Get('login')
    login(@Res({ passthrough: true }) res: Response) {
        res.cookie('sessionId', 'this_is_fake_session_id', {
            httpOnly: true, // 클라이언트에서 자바스크립트로 쿠키를 읽을 수 없습니다.
            secure: false, // https를 사용할 때만 쿠키를 전송합니다. (개발 환경에서는 false로 설정합니다.)
            sameSite: 'strict', // 쿠키가 다른 도메인으로 전송되는 것을 방지합니다.
            maxAge: 1000 * 60 * 30, // 쿠키의 만료 시간을 30분으로 설정합니다.
        });
        return { message: '로그인 성공' };
    }

    @Get('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('sessionId');
        return { message: '로그아웃 성공' };
    }

    @Get('check')
    check(@Req() req: Request) {
        const sessionId = req.cookies['sessionId'];

        if (!sessionId) {
            return { message: '인증되지 않은 사용자입니다.' };
        }

        return { message: '인증된 사용자입니다.' };
    }
}
