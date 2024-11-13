import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicStarRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(userId: number, architectureId: number) {
        return this.prisma.publicArchitectureStar.create({
            data: {
                userId,
                publicArchitectureId: architectureId
            },
            include: {
                publicArchitecture: true,
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }

    async remove(userId: number, architectureId: number) {
        return this.prisma.publicArchitectureStar.delete({
            where: {
                unique_star: {
                    userId,
                    publicArchitectureId: architectureId
                }
            },
            include: {
                publicArchitecture: true,
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }

    async checkArchitectureExists(architectureId: number) {
        const count = await this.prisma.publicArchitecture.count({
            where: { id: architectureId }
        });
        return count > 0;
    }
}
