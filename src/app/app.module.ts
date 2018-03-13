import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PrettyJsonModule} from 'angular2-prettyjson'

import { AppComponent, AbcComponent, XyzComponent, Service } from './app.component';


@NgModule({
  declarations: [
    AppComponent, AbcComponent, XyzComponent
  ],
  imports: [
    BrowserModule,
    PrettyJsonModule
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
