import { Component, ElementRef, ViewChild, Injectable, EventEmitter, Output } from '@angular/core';
import {reverse} from 'lodash'
import {Observable, Subscription, Subject, BehaviorSubject} from 'rxjs'
import {UsersService} from './users.service'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  subscriptions: Subscription[] = []
  @ViewChild('prev') previousButton: ElementRef
  @ViewChild('next') nextButton: ElementRef
  constructor(private usersService: UsersService) {
  }
  ngAfterViewInit() {
    
  }
  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe())
  }
}
