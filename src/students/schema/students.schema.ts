import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Students extends Document{
    @Prop()
    name: string;

    @Prop()
    identification: string;

    @Prop()
    age: Number;
}


export const StudentSchema = SchemaFactory.createForClass(Students);