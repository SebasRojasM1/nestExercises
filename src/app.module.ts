import { Module } from '@nestjs/common';
import { EventsModule } from './modules/events/events.module';
import { PersistanceModule } from './libs/persistance/persistance.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistance/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistanceModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
