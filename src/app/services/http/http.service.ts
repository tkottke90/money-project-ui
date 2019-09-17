import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  get(url: string, options?): Observable<any> {
    return this.http.get(url, options);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  patch(url: string, body: any): Observable<any> {
    return this.http.patch(url, body);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url);
  }

}
