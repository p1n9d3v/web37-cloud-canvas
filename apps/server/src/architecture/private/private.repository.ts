import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePrivateDto } from './dto/update-private.dto';
import { CreatePrivateDto } from './dto/create-private.dto';

export class PrivateRepository {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        this.prisma.privateArchitecture.findMany();
    }

    create(createPrivateDto: CreatePrivateDto) {
        return this.prisma.privateArchitecture.create({
            data: createPrivateDto,
        });
    }

    findById(id: number) {
        return this.prisma.privateArchitecture.findUnique({ where: { id } });
    }

    update(id: number, updatePrivateDto: UpdatePrivateDto) {
        return this.prisma.privateArchitecture.update({
            where: { id },
            data: updatePrivateDto,
        });
    }

    delete(id: number) {
        return this.prisma.privateArchitecture.delete({ where: { id } });
    }
}
