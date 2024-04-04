import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) { }

    //CREATE
    @Post("create")
    createTask(@Body() body) {
        return this.tasksService.createTask(body)
    }

    //Imprimir todos
    @Get('all')
    allTasks () {
        return this.tasksService.fillAllTasks();
    }

    //Buscar por ID
    @Get(':id') 
    findOne(@Param('id') id) {
        return this.tasksService.findOneTask(id)
    }

    //Actualizar
    @Put('/update/:id')
    updateStudent(@Param('id') id, @Body() body) {
        return this.tasksService.updateTask({ _id: id }, body)
    }

    //eliminar
    @Delete('delete/:id')
    deleteUser(@Param('id') id: string) {
        return this.tasksService.deleteTask({ _id: id })
    }

}
