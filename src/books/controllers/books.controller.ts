import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { BooksService } from '../service/books.service';
  import { BookDto } from '../dto/common/book.dto';
  import { PaginatedBooksRequestDto } from '../dto/request/paginated-books-request.dto';
  import { BookResponseDto } from '../dto/response/books-response.dto';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Post()
    async create(@Body() bookDto: BookDto) {
      return await this.booksService.create(bookDto);
    }
  
    @Get()
    async findAll() {
      return await this.booksService.findAll();
    }
  
    @Get('paginated')
    @HttpCode(HttpStatus.OK)
    async findPaginated(
      @Query() query: PaginatedBooksRequestDto,
    ): Promise<BookResponseDto[]> {
      const bookList = await this.booksService.findPaginated(
        query,
        { createdAt: -1 },
        query.docsPerPage,
        query.offset,
      );
      return bookList;
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.booksService.findOne(id);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() bookDto: BookDto) {
      return await this.booksService.update(id, bookDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.booksService.remove(id);
    }
  }