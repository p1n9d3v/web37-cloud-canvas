import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreatePrivateVersionDto {
    @IsNumber()
    @IsNotEmpty()
    privateArchitectureId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsObject()
    @IsNotEmpty()
    architecture: Record<string, any>;
}
