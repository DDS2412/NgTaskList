import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Card } from "src/app/models/card";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class APIService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  public getCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      `https://api.trello.com/1/boards/ZtxD09G7/cards?fields=name,desc,labels,due,dueComplete&members=true&member_fields=fullName&actions=createCard&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }

  getIdUser() {
    console.log(localStorage.getItem('idMe'));
  }
}
