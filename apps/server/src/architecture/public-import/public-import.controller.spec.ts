import { Test, TestingModule } from '@nestjs/testing';
import { PublicImportController } from './public-import.controller';
import { PublicImportService } from './public-import.service';
import { PublicImportRepository } from './public-import.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('PublicImportController', () => {
    let controller: PublicImportController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [PublicImportController],
            providers: [PublicImportService, PublicImportRepository],
        }).compile();

        controller = module.get<PublicImportController>(PublicImportController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
