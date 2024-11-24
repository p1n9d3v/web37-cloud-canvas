import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrivateVersionDto } from './dto/create-private-version.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VersionRepository {
    constructor(private readonly prisma: PrismaService) {}

    findByPrivateArchitectureId(id: number) {
        return this.prisma.privateArchitectureVersion.findMany({
            where: {
                privateArchitectureId: id,
            },
        });
    }

    create(
        architectureId: number,
        createPrivateVersionDto: CreatePrivateVersionDto,
    ) {
        return this.prisma.privateArchitectureVersion.create({
            data: {
                ...createPrivateVersionDto,
                privateArchitectureId: architectureId,
            },
        });
    }

    delete(versionId: number) {
        return this.prisma.privateArchitectureVersion.delete({
            where: {
                id: versionId,
            },
        });
    }
}
