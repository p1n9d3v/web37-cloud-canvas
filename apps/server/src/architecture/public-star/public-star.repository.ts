import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicStarRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    create(userId: number, architectureId: number) {
        return this.prisma.publicArchitectureStar.create({
            data: {
                userId,
                publicArchitectureId: architectureId
            }
        });
    }

    delete(userId: number, architectureId: number) {
        return this.prisma.publicArchitectureStar.delete({
            where: {
                unique_star: {
                    userId,
                    publicArchitectureId: architectureId
                }
            }
        });
    }

    architectureExists(architectureId: number) {
        return this.prisma.publicArchitecture
            .count({
                where: { id: architectureId }
            })
            .then(Boolean);
    }
}


