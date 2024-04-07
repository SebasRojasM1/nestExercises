import { Injectable, NotFoundException  } from '@nestjs/common';
import { Students } from './schema/students.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {

    constructor(@InjectModel(Students.name) private readonly studentModel: Model<Students>) { }

    async createStudent(student: Students): Promise<Students> {
        const newStudent = new this.studentModel(student);
        return await newStudent.save();
    }


    async fillAllStudents(){
        const fillAll = await this.studentModel.find().exec();
        return fillAll
    }


    async findOneStudent(id: string){
        const student = await this.studentModel.findOne({identification: id}).exec();

        if(!student) throw new NotFoundException('Student not found');

        return student;
    }

    async updateStudent(identification, body): Promise<Students> {
        const updateStudent = await this.studentModel.findOneAndUpdate(identification, body, {new: true}).exec();
        return await updateStudent;
    }

    async deleteStudent(identification): Promise<Students> {
        const deleteStudent = await this.studentModel.findOneAndDelete(identification).exec();
        return await deleteStudent;
    }
}
