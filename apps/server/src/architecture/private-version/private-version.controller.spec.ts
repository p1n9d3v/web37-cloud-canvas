import { Test, TestingModule } from '@nestjs/testing';
import { PrivateVersionController } from './private-version.controller';
import { PrivateVersionService } from './private-version.service';
import { PrivateVersionRepository } from './private-version.repository';

describe('PrivateVersionController', () => {
    let controller: PrivateVersionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PrivateVersionController],
            providers: [PrivateVersionService, PrivateVersionRepository],
        }).compile();

        controller = module.get<PrivateVersionController>(
            PrivateVersionController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
