import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Comment } from 'src/app/models/Comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit, OnDestroy {
  deleteBookObs$;
  addToCartObs$;
  @Input() book: Book;
  @Output() deleted = new EventEmitter<Book>();
  comment: Comment;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private authService: AuthService,
    private cartService: CartService,
    private commentService: CommentService
  ) {}
  ngOnDestroy(): void {
    if (this.deleteBookObs$) {
      this.deleteBookObs$.unsubscribe();
    }
    if (this.addToCartObs$) {
      this.addToCartObs$.unsubscribe();
    }
  }

  ngOnInit(): void {}

  isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  deleteBook(book: Book) {
    this.deleteBookObs$ = this.bookService.deleteBook(book).subscribe(
      (data) => {
        this.commentService
          .delCommentsByBookId(book.id)
          .subscribe((data) => {});
        this.toastr.success('Book deleted');
        this.deleted.emit(book);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  isAdmin(): boolean {
    return this.authService.getIsAdmin();
  }

  addToCart() {
    let total = +sessionStorage.getItem('total') || 0;
    this.addToCartObs$ = this.cartService.addToCart(this.book).subscribe(
      (b) => {
        total += b.price;
        sessionStorage.setItem('total', total.toString());
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
  onInsert(c) {
    this.comment = c;
  }
}
