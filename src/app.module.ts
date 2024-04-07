import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [StudentsModule, MongooseModule.forRoot('mongodb+srv://sebasrojasm1:JukZsyyNGB80ep4R@cluster0.lhj2or0.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
