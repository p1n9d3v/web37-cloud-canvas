import {
    Injectable,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { PublicImportRepository } from './public-import.repository';
import { CreatePublicImportDto } from './dto/create-public-import.dto';

@Injectable()
export class PublicImportService {
    constructor(
        private readonly publicImportRepository: PublicImportRepository,
    ) {}

    async create(userId: number, architectureId: number) {
        const exists =
            await this.publicImportRepository.architectureExists(
                architectureId,
            );
        if (!exists) {
            throw new NotFoundException('Architecture not found');
        }

        try {
            return await this.publicImportRepository.create(
                userId,
                architectureId,
            );
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException(
                    'Already imported this architecture',
                );
            }
            throw error;
        }
    }
}
