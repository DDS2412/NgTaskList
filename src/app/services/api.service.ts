import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Card } from "src/app/models/card";
import { Observable } from "rxjs";
import { UserInfo } from "../models/userInfo";

@Injectable({
  providedIn: "root"
})
export class APIService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  public getCards(boardId: string): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      `https://api.trello.com/1/boards/${boardId}/cards?fields=name,desc,labels,due,dueComplete&attachments=true&attachment_fields=url&members=true&member_fields=fullName&actions=createCard&token=${this.authService.getUsersToken()}&key=${this.authService.getApiKey()}`
    );
  }

  public getUserInfo(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(
      `https://api.trello.com/1/tokens/${this.authService.getUsersToken()}/member?fields=id,idBoards,fullName&token=${this.authService.getUsersToken()}&key=${this.authService.getApiKey()}`
    );
  }

  public getBoardsInfo(boardId: string): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      `https://api.trello.com/1/boards/${boardId}?fields=name&token=${this.authService.getUsersToken()}&key=${this.authService.getApiKey()}`
    );
  }
}
