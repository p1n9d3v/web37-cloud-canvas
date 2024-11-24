import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { PublicArchitectureService } from './public-architecture.service';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';

@Controller()
export class PublicArchitectureController {
    constructor(private readonly publicService: PublicArchitectureService) {}

    @Get()
    getPublicArchitectures() {
        return this.publicService.getPublicArchitectures();
    }

    @Post()
    createPublicArchitecture(@Body() createPublicDto: CreatePublicDto) {
        const userId = 1;
        return this.publicService.createPublicArchitecture(
            userId,
            createPublicDto,
        );
    }

    @Get(':id')
    getPublicArchitecture(@Param('id', ParseIntPipe) id: number) {
        return this.publicService.getPublicArchitecture(id);
    }

    @Delete(':id')
    deletePublicArchitecture(@Param('id', ParseIntPipe) id: number) {
        return this.publicService.deletePublicArchitecture(id);
    }

    @Patch(':id')
    updatePublicArchitecture(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePublicDto: UpdatePublicDto,
    ) {
        return this.publicService.updatePublicArchitecture(id, updatePublicDto);
    }
}
