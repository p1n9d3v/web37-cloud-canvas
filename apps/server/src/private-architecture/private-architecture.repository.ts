import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePrivateDto } from './dto/update-private.dto';
import { CreatePrivateDto } from './dto/create-private.dto';

@Injectable()
export class PrivateArchitectureRepository {
    constructor(private readonly prisma: PrismaService) {}

    findAll(userId: number) {
        return this.prisma.privateArchitecture.findMany({
            where: {
                authorId: userId,
            },
            select: {
                id: true,
                title: true,
                authorId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    create(userId: number, createPrivateDto: CreatePrivateDto) {
        return this.prisma.privateArchitecture.create({
            data: {
                ...createPrivateDto,
                authorId: userId,
            },
        });
    }

    findById(id: number) {
        return this.prisma.privateArchitecture.findUnique({
            where: { id },
        });
    }

    update(id: number, updatePrivateDto: UpdatePrivateDto) {
        return this.prisma.privateArchitecture.update({
            where: { id },
            data: updatePrivateDto,
        });
    }

    delete(id: number) {
        return this.prisma.privateArchitecture.delete({
            where: { id },
        });
    }
}
