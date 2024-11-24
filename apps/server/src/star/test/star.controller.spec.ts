import { Test } from '@nestjs/testing';
import { StarController } from '../star.controller';
import { StarService } from '../star.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { vi } from 'vitest';

describe('PublicStarController', () => {
    let controller: StarController;
    let service: Record<string, any>;

    const mockStar = {
        id: 1,
        userId: 1,
        publicArchitectureId: 1,
        createdAt: new Date(),
    };

    beforeEach(async () => {
        const serviceMock = {
            create: vi.fn(),
            delete: vi.fn(),
        };

        const module = await Test.createTestingModule({
            controllers: [StarController],
            providers: [
                {
                    provide: StarService,
                    useValue: serviceMock,
                },
            ],
        }).compile();

        controller = module.get<StarController>(StarController);
        service = module.get(StarService);
    });

    describe('createPublicArchitectureStar', () => {
        it('should create star successfully', async () => {
            service.create.mockReturnValue(mockStar);

            const result = await controller.createPublicArchitectureStar(1);

            expect(result).toEqual(mockStar);
            expect(service.create).toHaveBeenCalledWith(1, 1);
        });

        it('should throw NotFoundException when architecture not found', async () => {
            service.create.mockRejectedValue(new NotFoundException());

            await expect(
                controller.createPublicArchitectureStar(1),
            ).rejects.toThrow(NotFoundException);
        });

        it('should throw ConflictException when already starred', async () => {
            service.create.mockRejectedValue(new ConflictException());

            await expect(
                controller.createPublicArchitectureStar(1),
            ).rejects.toThrow(ConflictException);
        });
    });

    describe('delete', () => {
        it('should delete star successfully', async () => {
            service.delete.mockReturnValue(mockStar);

            const result = await controller.delete(1);

            expect(result).toEqual(mockStar);
            expect(service.delete).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException when star not found', async () => {
            service.delete.mockRejectedValue(new NotFoundException());

            await expect(controller.delete(1)).rejects.toThrow(
                NotFoundException,
            );
        });
    });
});
