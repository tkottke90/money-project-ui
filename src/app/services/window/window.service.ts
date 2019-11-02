import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  _window: Window;

  constructor() {
    this._window = window;
  }

  getAccessToken() {
    return this._window.sessionStorage.getItem('accessToken');
  }

  setAccessToken({ accessToken }) {
    this._window.sessionStorage.setItem('accessToken', accessToken);
  }

  removeAccessToken() {
    this._window.sessionStorage.removeItem('accessToken');
  }
}
