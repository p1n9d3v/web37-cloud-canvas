import { Controller, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { PublicStarService } from './public-star.service';

@Controller()
export class PublicStarController {
    constructor(private readonly publicStarService: PublicStarService) {}

    @Post()
    createPublicArchitectureStar(
        @Param('architectureId', ParseIntPipe) architectureId: number,
    ) {
        const userId = 1;
        return this.publicStarService.create(userId, architectureId);
    }

    @Delete()
    delete(@Param('architectureId', ParseIntPipe) architectureId: number) {
        const userId = 1;
        return this.publicStarService.delete(userId, architectureId);
    }
}
