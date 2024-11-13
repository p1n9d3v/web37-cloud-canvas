import { Module } from '@nestjs/common';
import { PrivateService } from './private.service';
import { PrivateController } from './private.controller';
import { PrivateRepository } from './private.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [PrivateController],
    providers: [PrivateService, PrivateRepository, PrismaService],
})
export class PrivateModule {}
