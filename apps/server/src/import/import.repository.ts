import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImportRepository {
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
