import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {AuthService} from './auth.service';

@Injectable({
  providedIn: "root"
})
export class APIService {


  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  public getCards() {
    return this.httpClient.get(
      `https://api.trello.com/1/boards/ZtxD09G7/cards?fields=all&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }

  public getBatch() {
    return this.httpClient.get(
      `https://api.trello.com/1/batch/?urls=/boards/ZtxD09G7/cards?fields=all,/boards/ZtxD09G7/members/&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }
}
