import { Test, TestingModule } from '@nestjs/testing';
import { StoreGamesController } from './store-games.controller';
import { StoreGamesService } from './store-games.service';

describe('StoreGamesController', () => {
  let controller: StoreGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreGamesController],
      providers: [StoreGamesService],
    }).compile();

    controller = module.get<StoreGamesController>(StoreGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
