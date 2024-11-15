import { Test, TestingModule } from '@nestjs/testing';
import { PublicService } from './public.service';
import { PublicRepository } from './public.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('PublicService', () => {
    let service: PublicService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            providers: [PublicService, PublicRepository],
        }).compile();

        service = module.get<PublicService>(PublicService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
