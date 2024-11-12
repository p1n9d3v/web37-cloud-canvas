import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';

@Injectable()
export class PublicRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async findAll() {
        return this.prisma.publicArchitecture.findMany({
            include: {
                author: {
                    select: { id: true, name: true }
                },
                _count: {
                    select: {
                        stars: true,
                        imports: true
                    }
                }
            }
        });
    }

    async findById(id: number) {
        return this.prisma.publicArchitecture.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                _count: {
                    select: {
                        stars: true,
                        imports: true
                    }
                }
            }
        });
    }

    async create(dto: CreatePublicDto) {
        return this.prisma.publicArchitecture.create({
            data: {
                title: dto.title,
                architecture: dto.architecture,
                cost: dto.cost,
                tag: dto.tag,
                authorId: 1
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }

    async update(id: number, dto: UpdatePublicDto) {
        return this.prisma.publicArchitecture.update({
            where: { id },
            data: dto,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }

    async delete(id: number) {
        return this.prisma.publicArchitecture.delete({
            where: { id }
        });
    }
}
