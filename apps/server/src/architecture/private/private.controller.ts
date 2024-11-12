import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Delete,
    Body,
    ParseIntPipe,
} from '@nestjs/common';
import { PrivateService } from './private.service';
import { CreatePrivateDto } from './dto/create-private.dto';
import { UpdatePrivateDto } from './dto/update-private.dto';

@Controller()
export class PrivateController {
    constructor(private readonly privateService: PrivateService) {}

    @Get()
    getPrivateArchitectures() {
        return this.privateService.getPrivateArchitectures();
    }

    @Post()
    createPrivateArchitecture(@Body() createPrivateDto: CreatePrivateDto) {
        return this.privateService.createPrivateArchitecture(createPrivateDto);
    }

    @Get(':id')
    getPrivateArchitecture(@Param('id', ParseIntPipe) id: number) {
        return this.privateService.getPrivateArchitecture(id);
    }

    @Patch(':id')
    updatePrivateArchitecture(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePrivateDto: UpdatePrivateDto,
    ) {
        return this.privateService.updatePrivateArchitecture(
            id,
            updatePrivateDto,
        );
    }

    @Delete(':id')
    deletePrivateArchitecture(@Param('id', ParseIntPipe) id: number) {
        return this.deletePrivateArchitecture(id);
    }
}
