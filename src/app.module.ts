0import { Module } from '@nestjs/common';
import dbConfig from './persistance/db-config';
import { ConfigModule } from '@nestjs/config';
import { PersistanceModule } from './persistance/persistance.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    load: [dbConfig],
    isGlobal: true,
    }),
    PersistanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
