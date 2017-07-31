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

  constructor(private HenriPotierService: HenriPotierService) { }

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
        //set items to json response
        var offers = data.offers;
        offers.forEach(function(e) {
          if (e.type === 'percentage') {
            priceOffers.push((price * e.value) / 100);
          }
          if (e.type === 'minus') {
            priceOffers.push(e.value);
          }
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
      },
      error => alert(error),
      () => console.log('success')
    );
  }


  ngOnInit(): void {
    this.finalDiscount = this.getDiscount(this.cart);
  }

}
