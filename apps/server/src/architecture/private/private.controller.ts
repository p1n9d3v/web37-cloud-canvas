import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Delete,
    Body,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { PrivateService } from './private.service';
import { CreatePrivateDto } from './dto/create-private.dto';
import { UpdatePrivateDto } from './dto/update-private.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller()
export class PrivateController {
    constructor(private readonly privateService: PrivateService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getPrivateArchitectures(@User('id') userId: number) {
        return this.privateService.getPrivateArchitectures(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createPrivateArchitecture(
        @User('id') userId: number,
        @Body() createPrivateDto: CreatePrivateDto,
    ) {
        return this.privateService.createPrivateArchitecture(
            userId,
            createPrivateDto,
        );
    }

    @Get(':id') // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    @UseGuards(JwtAuthGuard)
    getPrivateArchitecture(@Param('id', ParseIntPipe) id: number) {
        return this.privateService.getPrivateArchitecture(id);
    }

    @Patch(':id') // #TODO: userId로 조회하려는 데이터가 해당 유저의 것인지 확인
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    deletePrivateArchitecture(@Param('id', ParseIntPipe) id: number) {
        return this.privateService.deletePrivateArchitecture(id);
    }
}
