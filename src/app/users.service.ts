import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'


const BASE_URL = 'https://reqres.in/api/'

@Injectable()
export class UsersService {
  constructor(private http: Http) {
  }

  getUsers(page=1) {
    return this.http.get(`${BASE_URL}users?page=${page}`)
      .map(resp => resp.json())
      .do(resp => console.log(resp))
      .map(data => data.data)
  }
}