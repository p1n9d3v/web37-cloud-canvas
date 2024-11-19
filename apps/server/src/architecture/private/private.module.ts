import { Module } from '@nestjs/common';
import { PrivateService } from './private.service';
import { PrivateController } from './private.controller';
import { PrivateRepository } from './private.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PrivateController],
    providers: [PrivateService, PrivateRepository],
})
export class PrivateModule {}
