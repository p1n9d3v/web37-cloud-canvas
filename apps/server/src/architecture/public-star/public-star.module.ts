import { Module } from '@nestjs/common';
import { PublicStarService } from './public-star.service';
import { PublicStarController } from './public-star.controller';

@Module({
  controllers: [PublicStarController],
  providers: [PublicStarService],
})
export class PublicStarModule {}
