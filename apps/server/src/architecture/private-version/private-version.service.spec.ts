import { Test, TestingModule } from '@nestjs/testing';
import { PrivateVersionService } from './private-version.service';

describe('PrivateVersionService', () => {
  let service: PrivateVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateVersionService],
    }).compile();

    service = module.get<PrivateVersionService>(PrivateVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
