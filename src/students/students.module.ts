import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema, Students } from './schema/students.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Students.name, schema: StudentSchema}])],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
