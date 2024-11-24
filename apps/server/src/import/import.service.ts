import {
    Injectable,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { ImportRepository } from './import.repository';

@Injectable()
export class ImportService {
    constructor(private readonly publicImportRepository: ImportRepository) {}

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
