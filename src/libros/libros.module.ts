import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BookSchema } from './schema/libros.schema';
import { LibrosController } from './libros.controller';

@Module({
  imports:[MongooseModule.forFeature([{ name: Books.name, schema: BookSchema}])],
  providers: [LibrosService],
  controllers: [LibrosController]
})
export class LibrosModule {}
