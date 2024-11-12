import { Module } from '@nestjs/common';
import { PrivateService } from './private.service';
import { PrivateController } from './private.controller';
import { PrivateRepository } from './private.repository';

@Module({
    controllers: [PrivateController],
    providers: [PrivateService, PrivateRepository],
})
export class PrivateModule {}
