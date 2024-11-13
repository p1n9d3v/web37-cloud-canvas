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
        const userId = 1; // #TODO: userId 받아오기
        return this.privateService.getPrivateArchitectures(userId);
    }

    @Post()
    createPrivateArchitecture(@Body() createPrivateDto: CreatePrivateDto) {
        const userId = 1; // #TODO: userId 받아오기
        return this.privateService.createPrivateArchitecture(
            userId,
            createPrivateDto,
        );
    }

    @Get(':id') // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    getPrivateArchitecture(@Param('id', ParseIntPipe) id: number) {
        return this.privateService.getPrivateArchitecture(id);
    }

    @Patch(':id') // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    updatePrivateArchitecture(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePrivateDto: UpdatePrivateDto,
    ) {
        return this.privateService.updatePrivateArchitecture(
            id,
            updatePrivateDto,
        );
    }

    @Delete(':id') // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    deletePrivateArchitecture(@Param('id', ParseIntPipe) id: number) {
        return this.deletePrivateArchitecture(id);
    }
}
