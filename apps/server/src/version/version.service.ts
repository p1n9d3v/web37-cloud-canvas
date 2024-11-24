import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrivateVersionDto } from './dto/create-private-version.dto';
import { VersionRepository } from './version.repository';

@Injectable()
export class VersionService {
    constructor(private readonly repository: VersionRepository) {}

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
