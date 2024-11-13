import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PrivateVersionService } from './private-version.service';
import { CreatePrivateVersionDto } from './dto/create-private-version.dto';
import { UpdatePrivateVersionDto } from './dto/update-private-version.dto';

@Controller()
export class PrivateVersionController {
    constructor(
        private readonly privateVersionService: PrivateVersionService,
    ) {}

    @Post()
    create(@Body() createPrivateVersionDto: CreatePrivateVersionDto) {
        return this.privateVersionService.create(createPrivateVersionDto);
    }

    @Get()
    findAll() {
        return this.privateVersionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.privateVersionService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePrivateVersionDto: UpdatePrivateVersionDto,
    ) {
        return this.privateVersionService.update(+id, updatePrivateVersionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.privateVersionService.remove(+id);
    }
}
