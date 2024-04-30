import { Module } from '@nestjs/common';
import dbConfig from './libs/persistance/db-config';
import { ConfigModule } from '@nestjs/config';
import { PersistanceModule } from './libs/persistance/persistance.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './libs/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistanceModule,
    BooksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
