import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {Observable} from 'rxjs' 
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'


const BASE_URL = 'https://reqres.in/api/'

export interface User {
  first_name: string,
  last_name: string
}

@Injectable()
export class UsersService {
  constructor(private http: Http) {
  }

  getUsers(page=1): Observable<User[]> {
    return this.http.get(`${BASE_URL}users?page=${page}`)
      .map(response => response.json())
      .map(body => body.data)
  }
}