import { Injectable } from '@nestjs/common';
import { CreatePublicStarDto } from './dto/create-public-star.dto';
import { UpdatePublicStarDto } from './dto/update-public-star.dto';

@Injectable()
export class PublicStarService {
  create(createPublicStarDto: CreatePublicStarDto) {
    return 'This action adds a new publicStar';
  }

  findAll() {
    return `This action returns all publicStar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicStar`;
  }

  update(id: number, updatePublicStarDto: UpdatePublicStarDto) {
    return `This action updates a #${id} publicStar`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicStar`;
  }
}
