import { Injectable } from '@nestjs/common';
import { CreatePrivateDto } from './dto/create-private.dto';
import { UpdatePrivateDto } from './dto/update-private.dto';

@Injectable()
export class PrivateService {
  create(createPrivateDto: CreatePrivateDto) {
    return 'This action adds a new private';
  }

  findAll() {
    return `This action returns all private`;
  }

  findOne(id: number) {
    return `This action returns a #${id} private`;
  }

  update(id: number, updatePrivateDto: UpdatePrivateDto) {
    return `This action updates a #${id} private`;
  }

  remove(id: number) {
    return `This action removes a #${id} private`;
  }
}
