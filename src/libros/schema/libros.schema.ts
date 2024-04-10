import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Books extends Document{
    @Prop()
    name: string

    @Prop()
    author: string

    @Prop()
    pages: number

    @Prop()
    description: string
}

export const BookSchema = SchemaFactory.createForClass(Books)