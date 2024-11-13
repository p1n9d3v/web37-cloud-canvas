import { Test, TestingModule } from '@nestjs/testing';
import { PublicImportService } from './public-import.service';

describe('PublicImportService', () => {
  let service: PublicImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicImportService],
    }).compile();

    service = module.get<PublicImportService>(PublicImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
