import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { PrivateVersionService } from './private-version.service';
import { CreatePrivateVersionDto } from './dto/create-private-version.dto';

@Controller()
export class PrivateVersionController {
    constructor(
        private readonly privateVersionService: PrivateVersionService,
    ) {}

    @Get()
    getVersions(@Param('architectureId', ParseIntPipe) architectureId: number) {
        return this.privateVersionService.getVersions(architectureId);
    }

    @Post()
    createVersion(
        @Param('architectureId', ParseIntPipe) architectureId: number,
        @Body() createPrivateVersionDto: CreatePrivateVersionDto,
    ) {
        return this.privateVersionService.createVersion(
            architectureId,
            createPrivateVersionDto,
        );
    }

    @Delete(':id')
    deleteVersion(@Param('id', ParseIntPipe) id: number) {
        return this.privateVersionService.deleteVersion(id);
    }
}
