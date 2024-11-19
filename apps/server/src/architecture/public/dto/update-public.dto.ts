import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePublicDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}
