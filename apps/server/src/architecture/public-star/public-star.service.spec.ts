import { Test } from '@nestjs/testing';
import { PublicStarService } from './public-star.service';
import { PublicStarRepository } from './public-star.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { vi } from 'vitest';

describe('PublicStarService', () => {
    let service: PublicStarService;
    let repository: Record<string, any>;

    const mockStar = {
        id: 1,
        userId: 1,
        publicArchitectureId: 1,
        createdAt: new Date(),
    };

    beforeEach(async () => {
        const repositoryMock = {
            create: vi.fn(),
            delete: vi.fn(),
            architectureExists: vi.fn(),
        };

        const module = await Test.createTestingModule({
            providers: [
                PublicStarService,
                {
                    provide: PublicStarRepository,
                    useValue: repositoryMock,
                },
            ],
        }).compile();

        service = module.get<PublicStarService>(PublicStarService);
        repository = module.get(PublicStarRepository);
    });

    describe('create', () => {
        it('should create star successfully', async () => {
            repository.architectureExists.mockReturnValue(true);
            repository.create.mockReturnValue(mockStar);

            const result = await service.create(1, 1);

            expect(result).toEqual(mockStar);
            expect(repository.create).toHaveBeenCalledWith(1, 1);
        });

        it('should throw NotFoundException when architecture not found', async () => {
            repository.architectureExists.mockReturnValue(false);

            await expect(service.create(1, 1)).rejects.toThrow(
                NotFoundException,
            );
        });

        it('should throw ConflictException when already starred', async () => {
            repository.architectureExists.mockReturnValue(true);
            repository.create.mockRejectedValue({ code: 'P2002' });

            await expect(service.create(1, 1)).rejects.toThrow(
                ConflictException,
            );
        });
    });

    describe('delete', () => {
        it('should delete star successfully', async () => {
            repository.delete.mockReturnValue(mockStar);

            const result = await service.delete(1);

            expect(result).toEqual(mockStar);
            expect(repository.delete).toHaveBeenCalledWith(1, 1);
        });

        it('should throw NotFoundException when star not found', async () => {
            repository.delete.mockRejectedValue({ code: 'P2025' });

            await expect(service.delete(1)).rejects.toThrow(NotFoundException);
        });
    });
});
