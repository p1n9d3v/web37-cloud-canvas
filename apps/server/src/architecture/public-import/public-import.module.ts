import { Module } from '@nestjs/common';
import { PublicImportService } from './public-import.service';
import { PublicImportController } from './public-import.controller';
import { PublicImportRepository } from './public-import.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PublicImportController],
    providers: [PublicImportService, PublicImportRepository],
})
export class PublicImportModule {}
