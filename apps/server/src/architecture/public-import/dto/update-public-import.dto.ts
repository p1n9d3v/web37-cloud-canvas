import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicImportDto } from './create-public-import.dto';

export class UpdatePublicImportDto extends PartialType(CreatePublicImportDto) {
}
