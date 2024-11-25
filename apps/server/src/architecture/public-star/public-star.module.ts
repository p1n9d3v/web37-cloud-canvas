import { Module } from '@nestjs/common';
import { PublicStarService } from './public-star.service';
import { PublicStarController } from './public-star.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PublicStarRepository } from './public-star.repository';

@Module({
    imports: [PrismaModule],
    controllers: [PublicStarController],
    providers: [PublicStarService, PublicStarRepository],
})
export class PublicStarModule {}
