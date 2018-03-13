import { Component, ElementRef, ViewChild, Injectable, EventEmitter, Output } from '@angular/core';
import {reverse} from 'lodash'
import {Observable, Subscription} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  subscriptions: Subscription[] = []
  constructor() {

  }
  ngAfterViewInit() {
    
  }
  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe())
  }
}
