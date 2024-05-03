import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Prop({ required: true })
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  capacity: number;
}

export const EventsSchema = SchemaFactory.createForClass(Event);