import { Module } from '@nestjs/common';
import { PublicImportService } from './public-import.service';
import { PublicImportController } from './public-import.controller';

@Module({
  controllers: [PublicImportController],
  providers: [PublicImportService],
})
export class PublicImportModule {}
