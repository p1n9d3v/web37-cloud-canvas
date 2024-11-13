import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { PublicImportService } from './public-import.service';

@Controller()
export class PublicImportController {
    constructor(private readonly publicImportService: PublicImportService) {
    }

    @Post()
    create(@Param('architectureId', ParseIntPipe) architectureId: number) {
        const userId = 1;
        return this.publicImportService.create(userId, architectureId);
    }
}