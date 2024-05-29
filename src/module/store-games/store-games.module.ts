import { Module } from '@nestjs/common';
import { StoreGamesService } from './services/store-games.service';
import { StoreGamesController } from './controllers/store-games.controller';
import { StoreGame } from './entities/store-game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StoreGame])], //Entidad
  controllers: [StoreGamesController],
  providers: [StoreGamesService],
})
export class StoreGamesModule {}
