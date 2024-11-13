import { Test, TestingModule } from '@nestjs/testing';
import { PublicStarController } from './public-star.controller';
import { PublicStarService } from './public-star.service';

describe('PublicStarController', () => {
  let controller: PublicStarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicStarController],
      providers: [PublicStarService],
    }).compile();

    controller = module.get<PublicStarController>(PublicStarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});