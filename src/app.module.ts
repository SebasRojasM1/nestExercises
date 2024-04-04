import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://sebasrojasm1:JukZsyyNGB80ep4R@cluster0.lhj2or0.mongodb.net/'), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
