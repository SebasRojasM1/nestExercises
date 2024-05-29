/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StoreGamesService } from '../services/store-games.service';
import { CreateStoreGameDto } from '../dto/create-store-game.dto';
import { UpdateStoreGameDto } from '../dto/update-store-game.dto';
import { PaginationQueryDto } from '../dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Games store') 
@Controller('store-games')
export class StoreGamesController {
  constructor(private readonly gamesService: StoreGamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a game to the system.', description: 'Create a game to access the system.' })
  @ApiResponse({status: 201, description: 'Game created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the game is invalid.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while creating the game.'})
  create(@Body() createGame: CreateStoreGameDto) {
    return this.gamesService.createGame(createGame);
  }

  @ApiOperation({ summary: 'Find all the games of the system.', description: 'View all games registered in the system.' })
  @ApiResponse({status: 200, description: 'All games were found successfully.'})
  @ApiResponse({status: 404, description: 'No games were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the games.'})
  @Get("/all")
  findAll() {
    return this.gamesService.fillAllData();
  }

  @ApiOperation({ summary: 'Find the game/s by a specify search', description: 'View the games registered in the system with a specify search' })
  @Get()
  findBySearch(@Query() pagination: PaginationQueryDto) {
    return this.gamesService.findForSearch(pagination);
  }

  @ApiOperation({ summary: 'Find the game by ID of the system.', description: 'View a specific game registered in the database.' })
  @ApiResponse({status: 200, description: 'Game found successfully.',})
  @ApiResponse({status: 404, description: 'Game with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the game.'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a game to the system.', description: 'Update a specific game registered in the database.' })
  @ApiResponse({status: 200, description: 'Game updated successfully.'})
  @ApiResponse({status: 404, description: 'Game with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the game.'})
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateGame: UpdateStoreGameDto) {
    return this.gamesService.updateData(id, updateGame);
  }

  @ApiOperation({ summary: 'Delete a game to the system.', description: 'Delete a game of the system.' })
  @ApiResponse({status: 200, description: 'Game deleted successfully.'})
  @ApiResponse({status: 404, description: 'Game with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the game.'})
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.gamesService.deleteData(id);
  }
}
