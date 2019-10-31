import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject } from 'rxjs';

import { User } from '../../class/user.class';
import { BaseResponse } from 'src/app/class/base-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  $user: BehaviorSubject<User | null> = new BehaviorSubject(null);

  constructor(
    private http: HttpService
  ) { }

  async getCurrentUser() {
    if (!this.$user.getValue()) {
      return false;
    }

    return this.http.get('users?name=Thomas').toPromise();
  }

  async login(email, password) {
    const result = await this.http.post('authentication', {
      strategy: 'local',
      email,
      password
    }).toPromise();

    console.log(result);
    return result;
  }

  /**
   * Find user based on query parameters
   * @param {Object} query Object representing the query for a user account
   * @param {string} [customString] Query string allowing for custom options
   */
  findUser(query, customString: string = ''): Promise<BaseResponse<User>> {
    let queryString = Object.keys(query).reduce( (acc, cur) => acc += `?${cur}=${query[cur]}`, '');
    queryString += customString;

    return this.http.get(`users?${queryString}`).toPromise();
  }

  getAllUsers(): Promise<BaseResponse<User>> {
    return this.http.get(`users`).toPromise();
  }

  getUser(userId: string): Promise<BaseResponse<User>> {
    return this.http.get(`users/${userId}`).toPromise();
  }

  createUser(user: User): Promise<User> {
    return this.http.post('users', user).toPromise();
  }

  patchUser(user: User): Promise<User> {
    return this.http.patch(`users/${user.id}`, user).toPromise();
  }

  updateUser(user: User): Promise<User> {
    return this.http.post(`users/${user.id}`, user).toPromise();
  }

  deleteUser(user: User): Promise<User> {
    return this.http.delete(`users/${user.id}`).toPromise();
  }
}
