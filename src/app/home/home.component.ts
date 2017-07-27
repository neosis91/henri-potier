import { Component, OnInit } from '@angular/core';
import {HenriPotierService} from "../henripotier.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HenriPotierService]
})
export class HomeComponent implements OnInit {
  getBooks: void;
  private allBooks: any[];

  constructor(private HenriPotierService: HenriPotierService) { }

  getAllBooks(){
    this.HenriPotierService.getBooks().subscribe(
      data =>{
        //set items to json response
      this.allBooks = data;
    },
      error => alert(error),
      () => console.log('success')
    );
  }

  ngOnInit(): void {
    this.getBooks = this.getAllBooks();
  }

}
