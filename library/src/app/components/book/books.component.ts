import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
    });
  }

  delBook(book: Book) {
    this.books = this.books.filter((b) => b['id'] !== book['id']);
  }

  search(sch) {
    if (sch === '') {
      this.bookService.getAllBooks().subscribe((data) => {
        this.books = data;
        return;
      });
    }
    const rgx = new RegExp(`.*${sch}.*`, 'i');

    this.books = this.books.filter(
      (b) => rgx.test(b.title) || rgx.test(b.author)
    );
  }
}
