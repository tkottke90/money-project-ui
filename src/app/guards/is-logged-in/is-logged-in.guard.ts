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
import * as jwt_decode from 'jwt-decode';
import { UsersService } from '../../services/users/users.service';
import { WindowService } from 'src/app/services/window/window.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private userService: UsersService,
    private router: Router,
    private window: WindowService
  ) { }

  async checkLogin(url: string): Promise<boolean> {
    const user = await this.userService.getCurrentUser();
    const token = jwt_decode(this.window.getAccessToken());

    const now = new Date();
    const tokenExp = new Date(token.exp * 1000);

    if (user || now < tokenExp ) {
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
