import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicStarDto } from './create-public-star.dto';

export class UpdatePublicStarDto extends PartialType(CreatePublicStarDto) {}
