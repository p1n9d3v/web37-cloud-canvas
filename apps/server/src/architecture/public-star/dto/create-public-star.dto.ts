import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePublicStarDto {
    @IsNumber()
    @IsNotEmpty()
    architectureId: number;
}
