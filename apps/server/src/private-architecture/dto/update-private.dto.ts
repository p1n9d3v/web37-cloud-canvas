import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivateDto } from './create-private.dto';

export class UpdatePrivateDto extends PartialType(CreatePrivateDto) {}
