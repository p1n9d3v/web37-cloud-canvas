import { Injectable } from '@nestjs/common';
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
        return this.repository.delete(versionId);
    }
}
