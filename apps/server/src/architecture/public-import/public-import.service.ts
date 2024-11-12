import { Injectable } from '@nestjs/common';
import { CreatePublicImportDto } from './dto/create-public-import.dto';
import { UpdatePublicImportDto } from './dto/update-public-import.dto';

@Injectable()
export class PublicImportService {
  create(createPublicImportDto: CreatePublicImportDto) {
    return 'This action adds a new publicImport';
  }

  findAll() {
    return `This action returns all publicImport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicImport`;
  }

  update(id: number, updatePublicImportDto: UpdatePublicImportDto) {
    return `This action updates a #${id} publicImport`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicImport`;
  }
}
