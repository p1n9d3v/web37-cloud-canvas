import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicDto } from './create-public.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePublicDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}
