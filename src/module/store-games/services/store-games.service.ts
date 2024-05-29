/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreGameDto, UpdateStoreGameDto, PaginationQueryDto } from '../dto/';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreGame } from '../entities/store-game.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class StoreGamesService {
  constructor( @InjectRepository(StoreGame) private readonly gameRepository: Repository<StoreGame> ) {}

  async create(createGame: CreateStoreGameDto) {
    const game = this.gameRepository.create(createGame);
    return await this.gameRepository.save(game);
  }

  async findAll({limit, order, page, search, sortBy}: PaginationQueryDto) {
    const [results, total] = await this.gameRepository.findAndCount({
      where: search ? { name: ILike(`%${search}%`) } : {},
      order: { [sortBy]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      dataFound: total,
      results
    };
  }

  async findOne(id: string) {
    const game = await this.gameRepository.findOneBy( {id} )

    if (!game) throw new NotFoundException(`Game with id ${id} not found`)

    return game
  }
  async update(id: string, updateGame: UpdateStoreGameDto): Promise<StoreGame> {
    const storeGame = await this.gameRepository.findOneBy({ id });
  
    if (!storeGame) {
      throw new NotFoundException(`StoreGame with ID ${id} not found`);
    }
  
    await this.gameRepository.update(id, updateGame);
  
    const updatedStoreGame = await this.gameRepository.findOneBy({ id });
    if (!updatedStoreGame) {
      throw new NotFoundException(`StoreGame with ID ${id} not found after update`);
    }
  
    return updatedStoreGame;
  }
  

  async remove(id: string) {
    const game = await this.gameRepository.findOneBy( {id} )
  
    if (!game) throw new NotFoundException(`Game with id ${id} not found`)
  
    return await this.gameRepository.remove(game)
  
  }
}
