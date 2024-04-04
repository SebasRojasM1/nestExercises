import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Tasks extends Document{
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    completed: Boolean;
}


export const TasksSchema = SchemaFactory.createForClass(Tasks);