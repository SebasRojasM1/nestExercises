/* eslint-disable prettier/prettier */
import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Model } from 'mongoose';
import { Event } from '../entities/event.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    const existingEvent = await this.eventModel
      .findOne({ name: createEventDto.name })
      .exec();

    // Validar que la fecha del evento no sea en el pasado
    if (new Date(createEventDto.date) < new Date()) {
      throw new HttpException(`La fecha debe ser actual, y no pasada.`, HttpStatus.BAD_REQUEST);
    }

    // Validar que la capacidad no sea negativa
    if (createEventDto.capacity < 0) {
      throw new HttpException(`La capacidad del evento no debe ser negativa.`, HttpStatus.BAD_REQUEST);
    }


    if (existingEvent) {
      throw new HttpException(
        `The event ${createEventDto.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(_id: string): Promise<Event> {
    const event = await this.eventModel.findById(_id).exec();
    if (!event) {
      throw new NotFoundException(`The event with id ${_id} not found`);
    }
    return event;
  }

  async updateEvent(_id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(_id, updateEventDto, { new: true })
      .exec();

      // Validar que la fecha del evento no sea en el pasado
    if (new Date(updateEventDto.date) < new Date()) {
      throw new HttpException(`La fecha debe ser actual, y no pasada.`, HttpStatus.BAD_REQUEST);
    }

    // Validar que la capacidad no sea negativa
    if (updateEventDto.capacity < 0) {
      throw new HttpException(`La capacidad del evento no debe ser negativa.`, HttpStatus.BAD_REQUEST);
    }

    if (!updatedEvent) {
      throw new NotFoundException(`The event with id ${_id} not found`);
    }
    return updatedEvent;
  }

  async deleteEvent(_id: string): Promise<void> {
    const event = await this.eventModel.findByIdAndDelete(_id).exec();
    if (!event) {
      throw new NotFoundException(`The event with id ${_id} not found`);
    }
  }
}
