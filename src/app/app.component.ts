import { Component, ElementRef, ViewChild, Injectable, EventEmitter, Output } from '@angular/core';
import {reverse} from 'lodash'
import {Observable, Subscription, Subject, BehaviorSubject} from 'rxjs'
import {UsersService, User} from './users.service'
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  subscriptions: Subscription[] = []
  users = []
  page$ = new BehaviorSubject(1)
  users$ = new BehaviorSubject<User[]>([])
  @ViewChild('prev') previousButton: ElementRef
  @ViewChild('next') nextButton: ElementRef
  constructor(private usersService: UsersService) {
  }
  ngAfterViewInit() {
    this.subscriptions.push(
      Observable.merge(
        Observable.fromEvent(this.nextButton.nativeElement, 'click')
          .map(_ => 1),
        Observable.fromEvent(this.previousButton.nativeElement, 'click')
          .map(_ => -1)
      ).scan((acc, value) => acc + value, 0)
    .subscribe(this.page$))

    this.subscriptions.push(
      this.page$.switchMap(pageNumber => this.usersService.getUsers(pageNumber))
      .subscribe(this.users$)
    )

    /*
      Observable.of(1)
      1x
      nextClick:
      ------- e ----------- e ----
      ------- 1 ----------- 1 ----
      prevClick:
      -------------------------- e
      -------------------------- -1

      scan:
      0 0+1 --1+1 ----------2+1--3+(-1)
         1    2              3    2


      page:
      1 ----- 2 ----------- 3 -- 2
      \---Bob,Jane,Ant
              \- Joe,Lala,Ko
                            \----x-----A,B,C
                                \---Joe,Lala,Ko
    */
  }
  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe())
  }
}

