import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PublicImportService } from './public-import.service';
import { CreatePublicImportDto } from './dto/create-public-import.dto';
import { UpdatePublicImportDto } from './dto/update-public-import.dto';

@Controller()
export class PublicImportController {
    constructor(private readonly publicImportService: PublicImportService) {}

    @Post()
    create(@Body() createPublicImportDto: CreatePublicImportDto) {
        return this.publicImportService.create(createPublicImportDto);
    }

    @Get()
    findAll() {
        return this.publicImportService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.publicImportService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePublicImportDto: UpdatePublicImportDto,
    ) {
        return this.publicImportService.update(+id, updatePublicImportDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.publicImportService.remove(+id);
    }
}
