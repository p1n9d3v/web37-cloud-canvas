import { Controller, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { StarService } from './star.service';

@Controller()
export class StarController {
    constructor(private readonly publicStarService: StarService) {}

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
