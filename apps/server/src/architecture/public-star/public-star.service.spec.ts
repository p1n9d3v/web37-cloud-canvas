import { Test, TestingModule } from '@nestjs/testing';
import { PublicStarService } from './public-star.service';
import { PublicStarRepository } from './public-star.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('PublicStarService', () => {
    let service: PublicStarService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            providers: [PublicStarService, PublicStarRepository],
        }).compile();

        service = module.get<PublicStarService>(PublicStarService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
