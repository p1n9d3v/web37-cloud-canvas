import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { ImportService } from './import.service';

@Controller()
export class ImportController {
    constructor(private readonly publicImportService: ImportService) {}

    @Post()
    create(@Param('architectureId', ParseIntPipe) architectureId: number) {
        const userId = 1;
        return this.publicImportService.create(userId, architectureId);
    }
}
