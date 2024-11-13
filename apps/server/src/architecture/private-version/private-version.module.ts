import { Module } from '@nestjs/common';
import { PrivateVersionService } from './private-version.service';
import { PrivateVersionController } from './private-version.controller';
import { PrivateVersionRepository } from './private-version.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [PrivateVersionController],
    providers: [PrivateVersionService, PrivateVersionRepository, PrismaService],
})
export class PrivateVersionModule {}
