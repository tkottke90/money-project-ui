import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  async checkLogin(url: string): Promise<boolean> {
    const user = await this.userService.getCurrentUser();
    console.log('checkLogin', user);
    if (user) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const url: string = state.url;
    return this.checkLogin(url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  canLoad(
    route: Route
  ): Promise<boolean> {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }
}
