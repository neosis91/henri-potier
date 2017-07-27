import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HenriPotierService {

  constructor(private _http: Http) { }
  // méthode faisant appel a l'api de http://henri-potier.xebia.fr/ (GET)

  getBooks() {
    const url = 'http://henri-potier.xebia.fr/books';
    console.log('url getBooks: ' + url);
    return this._http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }
  getDiscount(lesIsbn) {
    const url = 'http://henri-potier.xebia.fr/books';
    for (let i = 0; i <= lesIsbn.length; i++) {
      url.concat(lesIsbn[i]);
      if (i < lesIsbn.length) {
        url.concat(',');
      } else {
        url.concat('/commercialOffers');
      }
    }
    console.log('discountUrl: ' + url);
    return this._http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw('Server error'));
  }

}
