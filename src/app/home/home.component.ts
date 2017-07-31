import { Component, OnInit } from '@angular/core';
import {HenriPotierService} from '../henripotier.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HenriPotierService]
})
export class HomeComponent implements OnInit {
  getBooks: void;
  private allBooks: any[];
  public cart = [];

  constructor(private HenriPotierService: HenriPotierService) { }

  getAllBooks() {
    this.HenriPotierService.getBooks().map(
      data => {
        //set items to json response
      this.allBooks = data;
    },
      error => alert(error),
      () => console.log('success')
    );
  }
  selectedBook(oneBook) {
    this.addBook = '';
    if (this.cart.indexOf(oneBook) < 0) {this.cart.push(oneBook)}
    localStorage.cartItems = JSON.stringify(this.cart);
  }
  unselectedBook(oneBook) {
    const toDelete = new Set([oneBook]);
    const newArray = localStorage.cartItems.filter(obj => !toDelete.has(obj.isbn));
    if (localStorage.cartItems.indexOf(oneBook) === 1) {}
      localStorage.cartItems = JSON.stringify(this.cart);
   }
   ngOnInit(): void {
    this.getBooks = this.getAllBooks();
  }

}
