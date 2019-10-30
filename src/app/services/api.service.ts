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
      `https://api.trello.com/1/boards/ZtxD09G7/cards?fields=name,desc,labels&members=true&member_fields=fullName&actions=createCard&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }

  public getBatch() {
    const urls = encodeURIComponent('/boards/ZtxD09G7/cards?fields=name%2Cdesc%2Clabels&members=true&member_fields=fullName&actions=createCard,/boards/ZtxD09G7/members/');
    return this.httpClient.get(
      `https://api.trello.com/1/batch/?urls=${urls}&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }
}
