import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Card, Label, Member } from "src/app/models/card";
import { Observable } from "rxjs";
import { UserInfo } from "../models/userInfo";
import { BoardInfo } from "../models/boardInfo";
import { ListInfo } from "../models/listInfo";

@Injectable({
  providedIn: "root"
})
export class APIService {
  private baseUrl = "https://api.trello.com/1/";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public getUserInfo(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(
      `${
        this.baseUrl
      }tokens/${this.authService.getUsersToken()}/member?fields=id,idBoards,fullName&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }

  public getBoardsInfoByMemberId(memberId: string): Observable<BoardInfo[]> {
    return this.httpClient.get<BoardInfo[]>(
      `${
        this.baseUrl
      }members/${memberId}/boards?fields=id,name&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }

  public getBoardsMembers(boardId: string): Observable<Member[]> {
    return this.httpClient.get<Member[]>(
      `${
        this.baseUrl
      }boards/${boardId}/members?fields=id,fullName&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }

  public getListsOfBoard(boardId: string): Observable<ListInfo[]> {
    return this.httpClient.get<ListInfo[]>(
      `${
        this.baseUrl
      }boards/${boardId}/lists?fields=id,name,idBoard&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }

  public getLabels(boardId: string): Observable<Label[]> {
    return this.httpClient.get<Label[]>(
      `${
        this.baseUrl
      }boards/${boardId}/labels?fields=all&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }

  public getCards(boardId: string): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      `${
        this.baseUrl
      }boards/${boardId}/cards?fields=name,desc,labels,due,dueComplete,idList,idBoard&attachments=true&attachment_fields=url&members=true&member_fields=fullName&actions=createCard&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`
    );
  }

  public postLabel(label: Label, idBoard: string): Observable<Label> {
    return this.httpClient.post<Label>(
      `${this.baseUrl}/labels?name=${
        label.name
      }&color=green&idBoard=${idBoard}&key=${this.authService.getApiKey()}&token=${this.authService.getUsersToken()}`,
      JSON.stringify(label)
    );
  }

  public postCard(card: Card, fileSource?): Observable<Card> {
    let members: string[] = [];
    let labels: string[] = [];
    card.members.forEach(element => {
      members.push(element.id);
    });
    card.labels.forEach(element => {
      labels.push(element.id);
    });
    return this.httpClient.post<Card>(
      `${this.baseUrl}/cards?name=${card.name}&desc=${card.desc}&due=${
        card.due
      }&idList=${
        card.idList
      }&idMembers=${members}&idLabels=${labels}&token=${this.authService.getUsersToken()}&key=${this.authService.getApiKey()}`,
      JSON.stringify(card)
    );
  }

  public putCard(card: Card, fileSource?): Observable<Card> {
    let members: string[] = [];
    let labels: string[] = [];
    card.members.forEach(element => {
      members.push(element.id);
    });
    card.labels.forEach(element => {
      labels.push(element.id);
    });
    return this.httpClient.put<Card>(
      `${this.baseUrl}/cards/${card.id}?name=${card.name}&desc=${card.desc}&due=${
        card.due
      }&idList=${
        card.idList
      }&idMembers=${members}&idLabels=${labels}&token=${this.authService.getUsersToken()}&key=${this.authService.getApiKey()}`,
      JSON.stringify(card)
    );
  }
}
