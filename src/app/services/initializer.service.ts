import { Injectable } from "@angular/core";
import { APIService } from "./api.service";
import { Card } from "../models/card";
import { UserInfo } from "../models/userInfo";
import { BoardInfo } from "../models/boardInfo";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { ListInfo } from '../models/listInfo';
import { element } from 'protractor';

@Injectable({
  providedIn: "root"
})
export class InitializerService {
  private _userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);
  private _boardsInfo = new BehaviorSubject<BoardInfo[]>([]);
  private _listsInfo: BehaviorSubject<[ListInfo[]]> = new BehaviorSubject<[ListInfo[]]>([[]]);
  private _cardList = new BehaviorSubject<[Card[]]>([[]]);
  private userInfoStore: { userInfo: UserInfo } = { userInfo: null };
  private boardInfoStore: { boardInfo: BoardInfo[] } = { boardInfo: [] };
  private listsInfoStore: { listInfo: [ListInfo[]] } = { listInfo: [[]] };
  private cardListStore: { cardList: [Card[]] } = { cardList: [[]] };
  readonly userInfo = this._userInfo.asObservable();
  readonly boardInfo = this._boardsInfo.asObservable();
  readonly cardList = this._cardList.asObservable();
  readonly listsInfo = this._listsInfo.asObservable();
  private observablesForCards: Observable<any>[] = [];
  private observablesForListsInfo: Observable<any>[] = [];

  constructor(private apiService: APIService) {}

  get boards() {
    return this._boardsInfo.asObservable();
  }

  get cards() {
    return this._cardList.asObservable();
  }

  createObservables() {
    this.userInfoStore.userInfo.idBoards.forEach(element => {
      this.observablesForCards.push(this.apiService.getCards(element));
      this.observablesForListsInfo.push(this.apiService.getListsOfBoard(element))
    });
  }

  loadAllBoardsInfo() {
    forkJoin(this.apiService.getUserInfo()).subscribe(userInfoData => {
      this.userInfoStore.userInfo = userInfoData[0];
      this._userInfo.next(Object.assign({}, this.userInfoStore).userInfo);
      this.createObservables();
      forkJoin(
        this.apiService.getBoardsInfoByMemberId(this.userInfoStore.userInfo.id),
        this.observablesForCards,
        this.observablesForListsInfo
      ).subscribe(boardInfoData => {
        this.boardInfoStore.boardInfo = boardInfoData[0];
        this._boardsInfo.next(Object.assign({}, this.boardInfoStore).boardInfo);
        this.observablesForCards.forEach((element, index) => {
          element.subscribe(data => {
            this.cardListStore.cardList[index] = data;
          });
        })
        this._cardList.next(Object.assign({}, this.cardListStore).cardList);
        this.observablesForListsInfo.forEach((element, index) => {
          element.subscribe(data => {
            this.listsInfoStore.listInfo[index] = data;
          });
        })
        this._listsInfo.next(Object.assign({}, this.listsInfoStore).listInfo);
      });
    });
  }
}
