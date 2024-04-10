import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Books, BookSchema } from './schema/libros.schema';
import { Model } from 'mongoose';

@Injectable()
export class LibrosService {

    constructor(@InjectModel(Books.name) private readonly bookModel: Model<Books>) {}

    //Crear nuevo libro
    async createBook(book: Books): Promise<Books> {
        const newBook = new this.bookModel(book);
        console.log(newBook);
        return await newBook.save();
    }



    //Listar todos los libros
    async fillAllBooks(){
        const allBooks =  await this.bookModel.find().exec();
        return allBooks
    }



    //Obtener un libro por ID
    async getBookById(id: string): Promise<Books> {
        const bookById = await this.bookModel.findById(id).exec();
        if (!bookById) {
            throw new NotFoundException("No se ha encontrado el libro buscado.");
        }
        return bookById;
    }



    //Actualizar un libro
    async updateBook(_id, body): Promise<Books> {
        const updateBook = await this.bookModel.findByIdAndUpdate(_id, body, {new: true}).exec();
        
        if (!updateBook) {
            throw new NotFoundException("No se ha encontrado el libro a actualizar.");
        }

        return updateBook;
    }



    //Eliminar un libro
    async deleteBook(id: string): Promise<Books>{
        const deleteBook = await this.bookModel.findByIdAndDelete(id).exec();

        if (!deleteBook) {
            throw new NotFoundException("No se ha encontrado el libro a eliminar.");
        }

        return deleteBook;
    }




    //Filtrar libros por author
    async filterBooksByAuthor(author: string): Promise<Books[]> {
        const filterBooksByAuthor = await this.bookModel.find({author}).exec();
        return filterBooksByAuthor;
    }


    //Filtrar libros por su nombre
    async filterBooksByName(name: string): Promise<Books[]> {
        const filterBooksByName = await this.bookModel.find({name}).exec();
        return filterBooksByName;
    }


    //Filtrar libros por numero de paginas
    async filterBooksByPages(pages: number): Promise<Books[]> {
        const filterBooksByPages = await this.bookModel.find({pages}).exec();
        return filterBooksByPages;
    }
}
