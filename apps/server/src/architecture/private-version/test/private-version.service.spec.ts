import { Test, TestingModule } from '@nestjs/testing';
import { PrivateVersionService } from '../private-version.service';
import { PrivateVersionRepository } from '../private-version.repository';
import { vi } from 'vitest';
import { CreatePrivateVersionDto } from '../dto/create-private-version.dto';

describe('PrivateVersionService', () => {
    let service: PrivateVersionService;
    let repository: PrivateVersionRepository;

    const mockUserId = 1;
    const mockVersionId = 1;

    const VERSIONS = 'VERSIONS';
    const CREATED_VERSION = 'CREATED_VERSION';
    const DELETED_VERSION = 'DELETED_VERSION';

    const mockRepository = {
        findByPrivateArchitectureId: vi.fn().mockResolvedValue(VERSIONS),
        create: vi.fn().mockResolvedValue(CREATED_VERSION),
        delete: vi.fn().mockResolvedValue(DELETED_VERSION),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrivateVersionService,
                {
                    provide: PrivateVersionRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<PrivateVersionService>(PrivateVersionService);
        repository = module.get<PrivateVersionRepository>(
            PrivateVersionRepository,
        );
    });

    it('PrivateVersionService는 정상적으로 정의되어야 한다.', () => {
        expect(service).toBeDefined();
    });

    describe('getVersions', () => {
        it('아키텍처의 버전 목록을 반환해야 한다.', async () => {
            const mockArchitectureId = 1;
            const result = await service.getVersions(mockArchitectureId);

            expect(repository.findByPrivateArchitectureId).toHaveBeenCalledWith(
                mockArchitectureId,
            );
            expect(result).toEqual(VERSIONS);
        });
    });

    describe('createVersion', () => {
        it('아키텍처의 버전을 생성해야 한다.', async () => {
            const dto = new CreatePrivateVersionDto();

            const result = await service.createVersion(mockUserId, dto);

            expect(repository.create).toHaveBeenCalledWith(mockUserId, dto);
            expect(result).toEqual(CREATED_VERSION);
        });
    });

    describe('deleteVersion', () => {
        it('아키텍처의 버전을 삭제해야 한다.', async () => {
            const result = await service.deleteVersion(mockVersionId);

            expect(repository.delete).toHaveBeenCalledWith(mockVersionId);
            expect(result).toEqual('DELETED_VERSION');
        });

        it('존재하지 않는 버전을 삭제하려고 하면 에러가 발생해야 한다.', async () => {
            mockRepository.delete.mockRejectedValue(new Error());

            await expect(
                service.deleteVersion(mockVersionId),
            ).rejects.toThrow();
        });
    });
});
