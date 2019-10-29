import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';

declare const login: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: AuthService) {}

  public login() {
    login(this.auth.getApiKey());
  }

  public logout() {
    this.auth.breakConnection();
  }
}
