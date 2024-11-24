import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { ImportRepository } from './import.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ImportController],
    providers: [ImportService, ImportRepository],
})
export class ImportModule {}
