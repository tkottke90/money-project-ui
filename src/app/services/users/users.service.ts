import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpService
  ) { }

  getUser$() {
    return this.http.get('/users?name=Thomas').toPromise();
  }
}
