import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrivateVersionDto } from './dto/create-private-version.dto';
import { PrivateVersionRepository } from './private-version.repository';

@Injectable()
export class PrivateVersionService {
    constructor(private readonly repository: PrivateVersionRepository) {}

    getVersions(architectureId: number) {
        return this.repository.findByPrivateArchitectureId(architectureId);
    }

    createVersion(
        architectureId: number,
        createPrivateVersionDto: CreatePrivateVersionDto,
    ) {
        return this.repository.create(architectureId, createPrivateVersionDto);
    }

    deleteVersion(versionId: number) {
        try {
            return this.repository.delete(versionId);
        } catch (error) {
            throw new NotFoundException('Architecture version not found');
        }
    }
}
