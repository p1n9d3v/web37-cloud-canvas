import { Module } from '@nestjs/common';
import { PrivateVersionService } from './private-version.service';
import { PrivateVersionController } from './private-version.controller';
import { PrivateVersionRepository } from './private-version.repository';

@Module({
    controllers: [PrivateVersionController],
    providers: [PrivateVersionService, PrivateVersionRepository],
})
export class PrivateVersionModule {}
