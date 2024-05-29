import { Test, TestingModule } from '@nestjs/testing';
import { StoreGamesService } from './store-games.service';

describe('StoreGamesService', () => {
  let service: StoreGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreGamesService],
    }).compile();

    service = module.get<StoreGamesService>(StoreGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
