import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicStarRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(userId: number, architectureId: number) {
        return this.prisma.$transaction(async (prisma) => {
            const star = await prisma.publicArchitectureStar.create({
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

            await prisma.publicArchitecture.update({
                where: { id: architectureId },
                data: { starCount: { increment: 1 } }
            });

            return star;
        });
    }

    async remove(userId: number, architectureId: number) {
        return this.prisma.$transaction(async (prisma) => {
            const star = await prisma.publicArchitectureStar.delete({
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

            await prisma.publicArchitecture.update({
                where: { id: architectureId },
                data: { starCount: { decrement: 1 } }
            });

            return star;
        });
    }

    async checkArchitectureExists(architectureId: number) {
        const count = await this.prisma.publicArchitecture.count({
            where: { id: architectureId }
        });
        return count > 0;
    }
}
