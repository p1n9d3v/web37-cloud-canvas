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

    @Get() // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    getVersions(@Param('architectureId', ParseIntPipe) architectureId: number) {
        return this.privateVersionService.getVersions(architectureId);
    }

    @Post() // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    createVersion(
        @Param('architectureId', ParseIntPipe) architectureId: number,
        @Body() createPrivateVersionDto: CreatePrivateVersionDto,
    ) {
        return this.privateVersionService.createVersion(
            architectureId,
            createPrivateVersionDto,
        );
    }

    @Delete(':id') // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    deleteVersion(@Param('id', ParseIntPipe) id: number) {
        return this.privateVersionService.deleteVersion(id);
    }
}
