/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StoreGamesService } from '../services/store-games.service';
import { CreateStoreGameDto } from '../dto/create-store-game.dto';
import { UpdateStoreGameDto } from '../dto/update-store-game.dto';
import { PaginationQueryDto } from '../dto';

@Controller('store-games')
export class StoreGamesController {
  constructor(private readonly gamesService: StoreGamesService) {}

  @Post()
  create(@Body() createGame: CreateStoreGameDto) {
    return this.gamesService.create(createGame);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.gamesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGame: UpdateStoreGameDto) {
    return this.gamesService.update(id, updateGame);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
