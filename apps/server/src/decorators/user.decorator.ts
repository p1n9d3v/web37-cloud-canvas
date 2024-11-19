import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { User as UserEntity } from '@prisma/client';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext): UserEntity => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('사용자 정보가 없습니다.');
        }

        if (!data) return user;
        if (data in user) return user[data];
        throw new InternalServerErrorException(
            `사용자 정보에 ${data}이/가 없습니다.`,
        );
    },
);
