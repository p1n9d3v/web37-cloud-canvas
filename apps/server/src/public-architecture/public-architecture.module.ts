import { Module } from '@nestjs/common';
import { PublicArchitectureService } from './public-architecture.service';
import { PublicArchitectureController } from './public-architecture.controller';
import { PublicArchitectureRepository } from './public-architecture.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PublicArchitectureController],
    providers: [PublicArchitectureService, PublicArchitectureRepository],
})
export class PublicArchitectureModule {}
