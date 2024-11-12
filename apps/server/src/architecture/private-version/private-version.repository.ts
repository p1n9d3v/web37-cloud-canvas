import { PrismaClient } from '@prisma/client';
import { CreatePrivateVersionDto } from './dto/create-private-version.dto';

export class PrivateVersionRepository {
    constructor(private readonly prisma: PrismaClient) {}

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
