import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true})
  pages: number;

  @Prop({ required: true })
  description: string;

  createdAt?: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);