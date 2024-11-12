import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivateVersionDto } from './create-private-version.dto';

export class UpdatePrivateVersionDto extends PartialType(CreatePrivateVersionDto) {}
