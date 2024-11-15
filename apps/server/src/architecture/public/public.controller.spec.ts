import { Test, TestingModule } from '@nestjs/testing';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { PublicRepository } from './public.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('PublicController', () => {
    let controller: PublicController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [PublicController],
            providers: [PublicService, PublicRepository],
        }).compile();

        controller = module.get<PublicController>(PublicController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
