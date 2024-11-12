import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
    constructor(private readonly prisma: PrismaService) {}

    async getHello(): Promise<string> {
        const data = await this.prisma.user.findMany();
        return JSON.stringify(data);
    }
}
