import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreatePrivateDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @IsObject()
    @IsNotEmpty()
    architecture: Record<string, any>;
}
