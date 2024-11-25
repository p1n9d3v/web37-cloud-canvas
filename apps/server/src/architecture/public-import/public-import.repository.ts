import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicImportRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(userId: number, architectureId: number) {
        return this.prisma.publicArchitectureImport.create({
            data: {
                userId,
                publicArchitectureId: architectureId,
            },
        });
    }

    architectureExists(architectureId: number) {
        return this.prisma.publicArchitecture
            .count({
                where: { id: architectureId },
            })
            .then(Boolean);
    }
}
