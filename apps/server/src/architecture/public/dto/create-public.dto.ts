import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreatePublicDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsObject()
    @IsNotEmpty()
    architecture: Record<string, any>;

    @IsNumber()
    @IsNotEmpty()
    cost: number;


    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    tag: string[];
}