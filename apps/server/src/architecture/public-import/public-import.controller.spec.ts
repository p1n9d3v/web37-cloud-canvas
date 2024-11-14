import { Test, TestingModule } from '@nestjs/testing';
import { PublicImportController } from './public-import.controller';
import { PublicImportService } from './public-import.service';

describe('PublicImportController', () => {
    let controller: PublicImportController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PublicImportController],
            providers: [PublicImportService],
        }).compile();

        controller = module.get<PublicImportController>(PublicImportController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
