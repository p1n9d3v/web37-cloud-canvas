import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PrivateService } from './private.service';
import { CreatePrivateDto } from './dto/create-private.dto';
import { UpdatePrivateDto } from './dto/update-private.dto';

@Controller()
export class PrivateController {
    constructor(private readonly privateService: PrivateService) {}

    @Post()
    create(@Body() createPrivateDto: CreatePrivateDto) {
        return this.privateService.create(createPrivateDto);
    }

    @Get()
    findAll() {
        return this.privateService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.privateService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePrivateDto: UpdatePrivateDto,
    ) {
        return this.privateService.update(+id, updatePrivateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.privateService.remove(+id);
    }
}
