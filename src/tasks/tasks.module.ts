import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from './schema/tasks.schema'; // Asumiendo que este es el archivo donde defines el Schema

@Module({
  imports: [MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema}])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
