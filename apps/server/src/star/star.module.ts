import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { StarController } from './star.controller';
import { StarRepository } from './star.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [StarController],
    providers: [StarService, StarRepository],
})
export class StarModule {}
