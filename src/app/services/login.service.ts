import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';

declare const login: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private appKey = 'c3f9b837515705c8e7e4e5ad95af9c32';

  constructor(private auth: AuthService) {}

  public login() {
    login(this.appKey);
  }

  public logout() {
    this.auth.breakConnection();
  }
}
