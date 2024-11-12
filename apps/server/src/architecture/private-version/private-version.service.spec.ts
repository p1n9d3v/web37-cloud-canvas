import { Test, TestingModule } from '@nestjs/testing';
import { PrivateVersionService } from './private-version.service';
import { PrivateVersionRepository } from './private-version.repository';

describe('PrivateVersionService', () => {
    let service: PrivateVersionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PrivateVersionService, PrivateVersionRepository],
        }).compile();

        service = module.get<PrivateVersionService>(PrivateVersionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
