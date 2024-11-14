import { Test, TestingModule } from '@nestjs/testing';
import { PublicStarService } from './public-star.service';

describe('PublicStarService', () => {
    let service: PublicStarService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PublicStarService],
        }).compile();

        service = module.get<PublicStarService>(PublicStarService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
