import { Controller, Post, Param } from '@nestjs/common';
import { PublicImportService } from './public-import.service';

@Controller()
export class PublicImportController {
    constructor(private readonly publicImportService: PublicImportService) {
    }

    @Post()
    create(@Param('architectureId') architectureId: string) {
        return this.publicImportService.create({
            architectureId: +architectureId
        });
    }
}