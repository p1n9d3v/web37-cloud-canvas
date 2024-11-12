import { Injectable } from '@nestjs/common';
import { UpdatePrivateDto } from './dto/update-private.dto';
import { PrivateRepository } from './private.repository';
import { CreatePrivateDto } from './dto/create-private.dto';

@Injectable()
export class PrivateService {
    constructor(private readonly repository: PrivateRepository) {}

    getPrivateArchitectures() {
        return this.repository.findAll();
    }

    createPrivateArchitecture(createPrivateDto: CreatePrivateDto) {
        return this.repository.create(createPrivateDto);
    }

    getPrivateArchitecture(id: number) {
        return this.repository.findById(id);
    }

    updatePrivateArchitecture(id: number, updatePrivateDto: UpdatePrivateDto) {
        return this.repository.update(id, updatePrivateDto);
    }

    deletePrivateArchitecture(id: number) {
        return this.repository.delete(id);
    }
}
