import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HenriPotierService {

  constructor(private _http: Http) { }
  // méthode faisant appel a l'api de http://henri-potier.xebia.fr/ (GET)
  // get all books
  getBooks() {
    const url = 'http://henri-potier.xebia.fr/books';
    console.log('url getBooks: ' + url);
    return this._http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }
  // get all discounts with isbn
  getDiscount(Books) {
    var url = 'http://henri-potier.xebia.fr/books/';
    Books.forEach(function(e) {
      url += e.isbn + ',';
    });
    url = url.substring(0, url.length - 1) + '/commercialOffers';
    return this._http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }
}
