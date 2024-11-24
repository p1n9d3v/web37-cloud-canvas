import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { VersionService } from './version.service';
import { CreatePrivateVersionDto } from './dto/create-private-version.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller()
export class VersionController {
    constructor(private readonly privateVersionService: VersionService) {}

    @Get() // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    @UseGuards(JwtAuthGuard)
    getVersions(@Param('architectureId', ParseIntPipe) architectureId: number) {
        return this.privateVersionService.getVersions(architectureId);
    }

    @Post() // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    deleteVersion(@Param('id', ParseIntPipe) id: number) {
        return this.privateVersionService.deleteVersion(id);
    }
}
