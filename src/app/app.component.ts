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
  users$: Subject<any[]> = new Subject()
  page$ = new BehaviorSubject(1)
  @ViewChild('prev') previousButton: ElementRef
  @ViewChild('next') nextButton: ElementRef
  constructor(private usersService: UsersService) {
  }
  ngAfterViewInit() {
    Observable.merge(
      Observable.of(0),
      Observable.fromEvent(this.previousButton.nativeElement, 'click').map(_ => -1),
      Observable.fromEvent(this.nextButton.nativeElement, 'click').map(_ => 1),
    )
    .scan((acc, value) => Math.max(1, acc + value), 1)
    .distinctUntilChanged()
    .startWith(1).subscribe(this.page$)
    
    this.page$
      .switchMap(page => this.usersService.getUsers(page))
      .do(x => console.log(x))
      .subscribe(this.users$)
  }
  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe())
  }
}
