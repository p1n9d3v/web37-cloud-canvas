import { Module } from '@nestjs/common';
import { PrivateVersionService } from './private-version.service';
import { PrivateVersionController } from './private-version.controller';

@Module({
  controllers: [PrivateVersionController],
  providers: [PrivateVersionService],
})
export class PrivateVersionModule {}
