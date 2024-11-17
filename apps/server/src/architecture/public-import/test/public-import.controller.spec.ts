import { Test } from '@nestjs/testing';
import { PublicImportController } from '../public-import.controller';
import { PublicImportService } from '../public-import.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { vi } from 'vitest';

describe('PublicImportController', () => {
    let controller: PublicImportController;
    let service: Record<string, any>;

    const mockImport = {
        id: 1,
        userId: 1,
        publicArchitectureId: 1,
        createdAt: new Date(),
    };

    beforeEach(async () => {
        const serviceMock = {
            create: vi.fn(),
        };

        const module = await Test.createTestingModule({
            controllers: [PublicImportController],
            providers: [
                {
                    provide: PublicImportService,
                    useValue: serviceMock,
                },
            ],
        }).compile();

        controller = module.get<PublicImportController>(PublicImportController);
        service = module.get(PublicImportService);
    });

    describe('create', () => {
        it('should create import successfully', async () => {
            service.create.mockResolvedValue(mockImport);

            const result = await controller.create(1);

            expect(result).toEqual(mockImport);
            expect(service.create).toHaveBeenCalledWith(1, 1);
        });

        it('should throw NotFoundException when architecture not found', async () => {
            service.create.mockRejectedValue(new NotFoundException());

            await expect(controller.create(1)).rejects.toThrow(
                NotFoundException,
            );
        });

        it('should throw ConflictException on duplicate import', async () => {
            service.create.mockRejectedValue(new ConflictException());

            await expect(controller.create(1)).rejects.toThrow(
                ConflictException,
            );
        });
    });
});
