import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({                         //Especificamos la ruta de nuestro MongoDB
  imports: [ProductModule, MongooseModule.forRoot("mongodb+srv://sebasrojasm1:IjnnasA6Fb27gnqF@cluster0.ziozbk9.mongodb.net/", )], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
