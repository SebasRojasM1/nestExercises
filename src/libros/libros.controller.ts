import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { LibrosService } from './libros.service';

@Controller('libros')
export class LibrosController {
    constructor(private readonly libroService: LibrosService){}

    //CREAR LIBROS
    @Post("/create")
    createBook(@Body() body){
        console.log(this.createBook)
        return this.libroService.createBook(body)
    }


    //Llamar todos los libros
    @Get()
    fillAllBooks(){                             //FUNCIONA
        return this.libroService.fillAllBooks()
    }


    //Llamar libro por su ID
    @Get("/:id")
    getBookById(@Param("id") id: string){ //FUNCIONA
        return this.libroService.getBookById(id)
    }


    //Actualizar libro
    @Put("update/:id")
    updateBook(@Param("id") id: string, @Body() body){
        return this.libroService.updateBook(id, body)
    }


    //Eliminar libro
    @Delete("delete/:_id")              //FUNCIONA
    deleteBook(@Param("_id") id){
        return this.libroService.deleteBook(id)
    }


    //Filtrar libros por autor
    @Get("author/:author")
    filterBooksByAuthor(@Param("author") author){
        return this.libroService.filterBooksByAuthor(author)
    }


    //Filtrar libro por su nombre
    @Get("/name/:name")
    filterBooksByName(@Param("name") name){
        return this.libroService.filterBooksByName(name)
    }


    //Filtrar libro por numero de paginas
    @Get("/pages/:pages")
    filterBooksByPages(@Param("pages") pages){
        return this.libroService.filterBooksByPages(pages)
    }
}
