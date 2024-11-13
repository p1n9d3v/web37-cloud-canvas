import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { PublicImportService } from './public-import.service';

@Controller()
export class PublicImportController {
    constructor(private readonly publicImportService: PublicImportService) {
    }

    @Post()
    create(@Param('architectureId', ParseIntPipe) architectureId: number) {
        return this.publicImportService.create({
            architectureId: architectureId
        });
    }
}