import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicImportRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(userId: number, architectureId: number) {
        return this.prisma.$transaction(async (prisma) => {
            const import_ = await prisma.publicArchitectureImport.create({
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
                data: { importCount: { increment: 1 } }
            });

            return import_;
        });
    }

    async checkArchitectureExists(architectureId: number) {
        const count = await this.prisma.publicArchitecture.count({
            where: { id: architectureId }
        });
        return count > 0;
    }
}
