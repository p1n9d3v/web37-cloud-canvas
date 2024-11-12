import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from '@nestjs/common';
import { PublicService } from './public.service';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';

@Controller()
export class PublicController {
    constructor(private readonly publicService: PublicService) {
    }

    @Get()
    getPublicArchitectures() {
        return this.publicService.getPublicArchitectures();
    }

    @Post()
    createPublicArchitecture(@Body() createPublicDto: CreatePublicDto) {
        return this.publicService.createPublicArchitecture(createPublicDto);
    }

    @Get(':id')
    getPublicArchitecture(@Param('id') id: string) {
        return this.publicService.getPublicArchitecture(+id);
    }

    @Delete(':id')
    deletePublicArchitecture(@Param('id') id: string) {
        return this.publicService.deletePublicArchitecture(+id);
    }

    @Patch(':id')
    updatePublicArchitecture(@Param('id') id: string, @Body() updatePublicDto: UpdatePublicDto) {
        return this.publicService.updatePublicArchitecture(+id, updatePublicDto);
    }
}
