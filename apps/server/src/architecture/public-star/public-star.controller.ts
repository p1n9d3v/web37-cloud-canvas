import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PublicStarService } from './public-star.service';
import { CreatePublicStarDto } from './dto/create-public-star.dto';
import { UpdatePublicStarDto } from './dto/update-public-star.dto';

@Controller()
export class PublicStarController {
    constructor(private readonly publicStarService: PublicStarService) {}

    @Post()
    create(@Body() createPublicStarDto: CreatePublicStarDto) {
        return this.publicStarService.create(createPublicStarDto);
    }

    @Get()
    findAll() {
        return this.publicStarService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.publicStarService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePublicStarDto: UpdatePublicStarDto,
    ) {
        return this.publicStarService.update(+id, updatePublicStarDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.publicStarService.remove(+id);
    }
}
