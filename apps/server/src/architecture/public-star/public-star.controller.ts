import { Controller, Post, Delete, Param } from '@nestjs/common';
import { PublicStarService } from './public-star.service';

@Controller()
export class PublicStarController {
    constructor(private readonly publicStarService: PublicStarService) {
    }

    @Post()
    createPublicArchitectureStar(@Param('architectureId') architectureId: string) {
        return this.publicStarService.create({
            architectureId: +architectureId
        });
    }

    @Delete()
    remove(@Param('architectureId') architectureId: string) {
        return this.publicStarService.remove(+architectureId);
    }
}

