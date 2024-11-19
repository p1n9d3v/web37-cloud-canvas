import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePublicImportDto {
    @IsNumber()
    @IsNotEmpty()
    architectureId: number;
}
