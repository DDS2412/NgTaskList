import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private API_KEY = "c3f9b837515705c8e7e4e5ad95af9c32";

  constructor() {}

  public setUsersToken(token: string) {
    localStorage.setItem('trello_token', token);
  }

  public breakConnection() {
    localStorage.removeItem('trello_token');
  }

  public getUsersToken() {
    return localStorage.getItem('trello_token');
  }

  public getApiKey() {
    return this.API_KEY;
  }

  public isAuthenticated(): boolean {
    return  localStorage.getItem('trello_token') != null;
  }
}
