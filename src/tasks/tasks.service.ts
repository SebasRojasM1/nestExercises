import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks, TasksSchema } from './schema/tasks.schema';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Tasks.name) private readonly tasksModel: Model<Tasks>) { }

    async createTask(task: Tasks): Promise<Tasks> {
        const newTask = new this.tasksModel(task);
        return await newTask.save();
    }


    async fillAllTasks(){
        const fillAll = await this.tasksModel.find().exec();
        return fillAll
    }


    async findOneTask(id: string){
        const task = await this.tasksModel.findOne({_id: id}).exec();

        if(!task) throw new NotFoundException('Task not found');

        return task;
    }

    async updateTask(id, body): Promise<Tasks> {
        const updatedTask = await this.tasksModel.findOneAndUpdate(id, body, {new: true}).exec();
        return await updatedTask;
    }

    async deleteTask(id): Promise<Tasks> {
        const deletedTask = await this.tasksModel.findOneAndDelete(id).exec();
        return await deletedTask;
    }
}
