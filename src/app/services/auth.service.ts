import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  public setUsersKey(token: string) {
    localStorage.setItem('trello_token', token);
  }

  public breakConnection() {
    localStorage.removeItem('trello_token');
  }

  public getUsersKey() {
    return localStorage.getItem('trello_token');
  }

  public isAuthenticated(): boolean {
    return  localStorage.getItem('trello_token') != null;
  }
}
