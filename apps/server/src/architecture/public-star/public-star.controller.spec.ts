import { Test, TestingModule } from '@nestjs/testing';
import { PublicStarController } from './public-star.controller';
import { PublicStarService } from './public-star.service';
import { PublicStarRepository } from './public-star.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('PublicStarController', () => {
    let controller: PublicStarController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [PublicStarController],
            providers: [PublicStarService, PublicStarRepository],
        }).compile();

        controller = module.get<PublicStarController>(PublicStarController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
