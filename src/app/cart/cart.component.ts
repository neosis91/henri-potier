import { Component, OnInit } from '@angular/core';
import {HenriPotierService} from '../henripotier.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [HenriPotierService]
})
export class CartComponent implements OnInit {
  finalDiscount: void;
  public cart = JSON.parse(localStorage.getItem('cartItems'));
  if(cart === []){
    this.addBook = 'Votre panier est vide.';
  } else {
    this.addBook = '';
  }

  constructor(private HenriPotierService: HenriPotierService) { }
  reinitCart(){
    localStorage.clear();
    this.cart = [];
  }
  getDiscount(cart) {
    // price of books in cart
    var price = 0;
    cart.forEach(function(e){
      price += e.price;
    });
    // number of books in cart
    var nbBookCart = this.cart.length;
    var priceOffers = [];
    //recover discount with service api and choose best discount
    this.HenriPotierService.getDiscount(cart).subscribe(
      data => {
        //return HenriPotier discount
        return data.offers;
      },
      error => alert(error),
      () => console.log('success')
    );
  }
  // choose the best discount for the customer
  getBestDiscount(offers){
    offers.forEach(function(e) {
          // conditon for percentage
          if (e.type === 'percentage') {
            priceOffers.push((price * e.value) / 100);
          }
          // condition for minus
          if (e.type === 'minus') {
            priceOffers.push(e.value);
          }
          // condition for slice
          if (e.type === 'slice') {
            priceOffers.push(((price - (price % 100)) / e.sliceValue) * e.value);
          }
        });
        var bestDiscount = 0;
        priceOffers.forEach(function (e){
          if (e > bestDiscount ) {
            bestDiscount = e;
          }
        });
        console.log(bestDiscount);
        return [price, bestDiscount];
  }
  ngOnInit(): void {
    this.finalDiscount = this.getBestDiscount(this.getDiscount(this.cart));
    this.addBook;
  }

}
