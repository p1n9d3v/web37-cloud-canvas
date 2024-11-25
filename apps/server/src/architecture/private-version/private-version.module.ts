import { Module } from '@nestjs/common';
import { PrivateVersionService } from './private-version.service';
import { PrivateVersionController } from './private-version.controller';
import { PrivateVersionRepository } from './private-version.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PrivateVersionController],
    providers: [PrivateVersionService, PrivateVersionRepository],
})
export class PrivateVersionModule {}
