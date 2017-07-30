import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import des styles Material Design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule, MdCheckboxModule} from '@angular/material';


import { AppComponent } from './app.component';
import { HenriPotierService } from './henripotier.service';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';


//import routes
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    [BrowserAnimationsModule],
    [MdButtonModule, MdToolbarModule, MdInputModule, MdCardModule, MdGridListModule, MdCheckboxModule],
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [HenriPotierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
