import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  @IsString()
  @Prop({ required: true })
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}

export const EventsSchema = SchemaFactory.createForClass(Event);