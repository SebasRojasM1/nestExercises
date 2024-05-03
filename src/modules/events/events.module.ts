import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventsSchema } from './entities/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventsSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService, MongooseModule],
})
export class EventsModule {}
