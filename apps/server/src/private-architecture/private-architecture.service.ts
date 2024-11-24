import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePrivateDto } from './dto/update-private.dto';
import { CreatePrivateDto } from './dto/create-private.dto';
import { PrivateArchitectureRepository } from './private-architecture.repository';

@Injectable()
export class PrivateArchitectureService {
    constructor(private readonly repository: PrivateArchitectureRepository) {}

    getPrivateArchitectures(userId: number) {
        return this.repository.findAll(userId);
    }

    createPrivateArchitecture(
        userId: number,
        createPrivateDto: CreatePrivateDto,
    ) {
        return this.repository.create(userId, createPrivateDto);
    }

    async getPrivateArchitecture(id: number) {
        const privateArchitecture = await this.repository.findById(id);

        if (!privateArchitecture) {
            throw new NotFoundException('Private architecture not found');
        }

        return privateArchitecture;
    }

    async updatePrivateArchitecture(
        id: number,
        updatePrivateDto: UpdatePrivateDto,
    ) {
        try {
            return await this.repository.update(id, updatePrivateDto);
        } catch (error) {
            throw new NotFoundException('Private architecture not found');
        }
    }

    async deletePrivateArchitecture(id: number) {
        try {
            return await this.repository.delete(id);
        } catch (error) {
            throw new NotFoundException('Private architecture not found');
        }
    }
}
