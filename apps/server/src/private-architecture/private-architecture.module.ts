import { Module } from '@nestjs/common';
import { PrivateArchitectureService } from './private-architecture.service';
import { PrivateArchitectureController } from './private-architecture.controller';
import { PrivateArchitectureRepository } from './private-architecture.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PrivateArchitectureController],
    providers: [PrivateArchitectureService, PrivateArchitectureRepository],
})
export class PrivateArchitectureModule {}
