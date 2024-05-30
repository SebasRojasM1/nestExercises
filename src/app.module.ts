import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreGame } from './module/store-games/entities/store-game.entity';
import { StoreGamesModule } from './module/store-games/store-games.module';
import { StoreGamesController } from './module/store-games/controllers/store-games.controller';
import { StoreGamesService } from './module/store-games/services/store-games.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      entities: [StoreGame],  
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([StoreGame]), // Register your entities
    StoreGamesModule,
  ],
  controllers: [StoreGamesController],
  providers: [StoreGamesService],
})
export class AppModule {}