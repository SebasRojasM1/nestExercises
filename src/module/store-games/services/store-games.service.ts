/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreGameDto, UpdateStoreGameDto, PaginationQueryDto } from '../dto/';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreGame } from '../entities/store-game.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class StoreGamesService {
  constructor( @InjectRepository(StoreGame) private readonly gameRepository: Repository<StoreGame> ) {}

  async createGame(createGame: CreateStoreGameDto) {
    const game = this.gameRepository.create(createGame);
    return await this.gameRepository.save(game);
  }

  async findForSearch({limit, order, page, search, sortBy}: PaginationQueryDto) {
    const [results, total] = await this.gameRepository.findAndCount({
      where: { 
        name: ILike(`%${search}%`) 
      },
      order: { 
        [sortBy]: order //Se ordena de manera ASC o DESC según la propiedad que pasemos (sortBy)
      }, 
      skip: (page - 1) * limit, //Se resta 1 ya que la lista comienza en 1, pero en realidad debe comenzar en 0, por lo cual se "resetea"
      take: limit, //Número máximo de entidades a recuperar
    });

    return {
      currentPage: page,//Pagina actual
      totalPages: Math.ceil(total / limit), //Paginas disponibles, según el total de valores encontrados y el limite de datos a reflejar por pagina
      dataFound: total,//Valores encontrados
      results //Cuerpo con la info encontrada y que coincide
    };
  }

  async fillAllData(){
    return await this.gameRepository.find()
  }

  async findOne(id: string) {
    const game = await this.gameRepository.findOneBy( {id} )

    if (!game) throw new NotFoundException(`Game with id ${id} not found`)

    return game
  }

  async updateData(id: string, updateGame: UpdateStoreGameDto): Promise<StoreGame> {
    const storeGame = await this.gameRepository.findOneBy({ id });
  
    if (!storeGame) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    await this.gameRepository.update(id, updateGame);
  
    const updatedStoreGame = await this.gameRepository.findOneBy({ id });
    if (!updatedStoreGame) {
      throw new NotFoundException(`Game with ID ${id} not found.`);
    }
  
    return updatedStoreGame;
  }
  

  async deleteData(id: string) {
    const game = await this.gameRepository.findOneBy( {id} )
  
    if (!game) throw new NotFoundException(`Game with id ${id} not found`)
  
    return await this.gameRepository.remove(game)
  
  }
}
