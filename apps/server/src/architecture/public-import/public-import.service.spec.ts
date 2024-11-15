import { Test, TestingModule } from '@nestjs/testing';
import { PublicImportService } from './public-import.service';
import { PublicImportRepository } from './public-import.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('PublicImportService', () => {
    let service: PublicImportService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            providers: [PublicImportService, PublicImportRepository],
        }).compile();

        service = module.get<PublicImportService>(PublicImportService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
