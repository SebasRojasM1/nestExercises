import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentService: StudentsService) { }

    //CREATE
    @Post("create")
    createStudent(@Body() body) {
        return this.studentService.createStudent(body)
    }

    //Imprimir todos
    @Get('')
    allStudents () {
        return this.studentService.fillAllStudents();
    }

    //Buscar por "Identification" (parameter)
    @Get(':identification') 
    findOne(@Param('identification') identification) {
        return this.studentService.findOneStudent(identification)
    }

    //Actualizar
    @Put('/update/:identification')
    updateStudent(@Param('identification') id, @Body() body) {
        return this.studentService.updateStudent({ identification: id }, body)
    }

    //Eliminar
    @Delete('delete/:identification')
    deleteUser(@Param('identification') id: string) {
        return this.studentService.deleteStudent({ identification: id })
    }
}
