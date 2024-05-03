/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post('create')
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }

  @Get()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(id);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return await this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return await this.eventService.deleteEvent(id);
  }
}
