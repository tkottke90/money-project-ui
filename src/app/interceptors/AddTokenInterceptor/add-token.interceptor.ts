import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { WindowService } from 'src/app/services/window/window.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  ignoredRoutes = ['authentication'];

  constructor(private window: WindowService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Ignore Login attempt it will be to -> /api/authentication
    if (request.url === '/api/authentication') { next.handle(request); }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.window.getAccessToken()}`
      }
    });
    return next.handle(request);
  }
}