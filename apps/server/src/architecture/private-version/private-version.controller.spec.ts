import { Test, TestingModule } from '@nestjs/testing';
import { PrivateVersionController } from './private-version.controller';
import { PrivateVersionService } from './private-version.service';
import { vi } from 'vitest';
import { CreatePrivateVersionDto } from './dto/create-private-version.dto';

describe('PrivateVersionController', () => {
    let controller: PrivateVersionController;
    let service: PrivateVersionService;

    const mockArchitectureId = 1;
    const mockVersionId = 1;

    const VERSIONS = 'VERSIONS';
    const CREATED_VERSION = 'CREATED_VERSION';
    const DELETED_VERSION = 'DELETED_VERSION';

    const mockPrivateVersionService = {
        getVersions: vi.fn().mockResolvedValue(VERSIONS),
        createVersion: vi.fn().mockResolvedValue(CREATED_VERSION),
        deleteVersion: vi.fn().mockResolvedValue(DELETED_VERSION),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PrivateVersionController],
            providers: [
                {
                    provide: PrivateVersionService,
                    useValue: mockPrivateVersionService,
                },
            ],
        }).compile();

        controller = module.get<PrivateVersionController>(
            PrivateVersionController,
        );
        service = module.get<PrivateVersionService>(PrivateVersionService);
    });

    it('PrivateVersionController는 정상적으로 정의되어야 한다.', () => {
        expect(controller).toBeDefined();
    });

    describe('GET /architectures/private/:architectureId/version', () => {
        it('인증된 사용자가 아키텍처의 소유자일 경우 아키텍처 버전 목록을 반환해야 한다.', async () => {
            const result = await controller.getVersions(mockArchitectureId);

            expect(service.getVersions).toHaveBeenCalledWith(
                mockArchitectureId,
            );
            expect(result).toEqual(VERSIONS);
        });
    });

    describe('POST /architectures/private/:architectureId/version', () => {
        it('인증된 사용자가 아키텍처의 소유자일 경우 아키텍처 버전을 생성해야 한다.', async () => {
            const dto = new CreatePrivateVersionDto();

            const result = await controller.createVersion(
                mockArchitectureId,
                dto,
            );

            expect(service.createVersion).toHaveBeenCalledWith(
                mockArchitectureId,
                dto,
            );
            expect(result).toEqual(CREATED_VERSION);
        });
    });

    describe('DELETE /architectures/private/:architectureId/version/:id', () => {
        it('인증된 사용자가 아키텍처의 소유자일 경우 아키텍처 버전을 삭제해야 한다.', async () => {
            const result = await controller.deleteVersion(mockVersionId);

            expect(service.deleteVersion).toHaveBeenCalledWith(mockVersionId);
            expect(result).toEqual(DELETED_VERSION);
        });
    });
});
