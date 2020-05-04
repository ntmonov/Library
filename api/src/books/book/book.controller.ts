import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from 'src/models/book.model';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':bookId')
  getBook(@Param('bookId') booId: number) {
    return this.bookService.getBook(booId);
  }

  @Post()
  @UseGuards(AuthGuard())
  addBook(@Body(ValidationPipe) book: BookDTO) {
    return this.bookService.addBook(book);
  }

  @Delete(':bookId/:creator')
  @UseGuards(AuthGuard())
  deleteBook(
    @Param('bookId') bookId: number,
    @Param('creator') creator: string,
    @User() { username }: UserEntity,
  ) {
    return this.bookService.deleteBook(bookId, creator, username);
  }

  @Put(':bookId/:creator')
  @UseGuards(AuthGuard())
  updateBook(
    @Param('bookId') bookId: number,
    @Param('creator') creator: string,
    @User() { username }: UserEntity,
    @Body() book: BookDTO,
  ) {
    return this.bookService.updateBook(bookId, creator, username, book);
  }
}
