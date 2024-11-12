import { Injectable } from '@nestjs/common';
import { CreatePrivateVersionDto } from './dto/create-private-version.dto';
import { UpdatePrivateVersionDto } from './dto/update-private-version.dto';

@Injectable()
export class PrivateVersionService {
  create(createPrivateVersionDto: CreatePrivateVersionDto) {
    return 'This action adds a new privateVersion';
  }

  findAll() {
    return `This action returns all privateVersion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privateVersion`;
  }

  update(id: number, updatePrivateVersionDto: UpdatePrivateVersionDto) {
    return `This action updates a #${id} privateVersion`;
  }

  remove(id: number) {
    return `This action removes a #${id} privateVersion`;
  }
}
