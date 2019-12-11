import { Injectable } from "@angular/core";
import { APIService } from "./api.service";
import { Card, Label } from "../models/card";
import { UserInfo } from "../models/userInfo";
import { BoardInfo } from "../models/boardInfo";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { ListInfo } from "../models/listInfo";

@Injectable({
  providedIn: "root"
})
export class InitializerService {
  private _userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(
    null
  );
  private _boardsInfo = new BehaviorSubject<BoardInfo[]>([]);
  private _listsInfo: BehaviorSubject<[ListInfo[]]> = new BehaviorSubject<
    [ListInfo[]]
  >([[]]);
  private _cardList = new BehaviorSubject<[Card[]]>([[]]);
  private _labelList = new BehaviorSubject<[Label[]]>([[]]);
  private userInfoStore: { userInfo: UserInfo } = { userInfo: null };
  private boardInfoStore: { boardInfo: BoardInfo[] } = { boardInfo: [] };
  private listsInfoStore: { listInfo: [ListInfo[]] } = { listInfo: [[]] };
  private cardListStore: { cardList: [Card[]] } = { cardList: [[]] };
  private labelListStore: { labelList: [Label[]] } = { labelList: [[]] };
  readonly userInfo = this._userInfo.asObservable();
  readonly boardInfo = this._boardsInfo.asObservable();
  readonly listsInfo = this._listsInfo.asObservable();
  readonly cardList = this._cardList.asObservable();
  readonly labelList = this._labelList.asObservable();
  private observablesForCards: Observable<any>[] = [];
  private observablesForListsInfo: Observable<any>[] = [];
  private observablesForLabelInfo: Observable<any>[] = [];

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
      this.observablesForListsInfo.push(
        this.apiService.getListsOfBoard(element)
      );
      this.observablesForLabelInfo.push(this.apiService.getLabels(element));
    });
  }

  loadAllBoardsInfo() {
    this.apiService.getUserInfo().subscribe(userInfoData => {
      this.userInfoStore.userInfo = userInfoData;
      this._userInfo.next(Object.assign({}, this.userInfoStore).userInfo);
      this.createObservables();
      forkJoin(
        this.apiService.getBoardsInfoByMemberId(this.userInfoStore.userInfo.id),
        this.observablesForCards,
        this.observablesForListsInfo,
        this.observablesForLabelInfo
      ).subscribe(boardInfoData => {
        this.boardInfoStore.boardInfo = boardInfoData[0];
        this._boardsInfo.next(Object.assign({}, this.boardInfoStore).boardInfo);
        this.observablesForCards.forEach((element, index) => {
          element.subscribe(data => {
            this.cardListStore.cardList[index] = data;
          });
        });
        this._cardList.next(Object.assign({}, this.cardListStore).cardList);
        this.observablesForListsInfo.forEach((element, index) => {
          element.subscribe(data => {
            this.listsInfoStore.listInfo[index] = data;
          });
        });
        this._listsInfo.next(Object.assign({}, this.listsInfoStore).listInfo);
        this.observablesForLabelInfo.forEach((element, index) => {
          element.subscribe(data => {
            this.labelListStore.labelList[index] = data;
          });
        });
        this._labelList.next(Object.assign({}, this.labelListStore).labelList);
      });
    });
  }

  addCard(card: Card, cardToPost: Card, index) {
    card.actions = [{ date: new Date().toString() }];
    card.members = cardToPost.members;
    this.cardListStore.cardList[index].push(card);
  }

  updateCard(card: Card, index) {
    const foundIndex = this.cardListStore.cardList[index].findIndex(
      c => c.id === card.id
    );
    Object.keys(card).forEach(key => {
      if (
        card[`${key}`] !==
        this.cardListStore.cardList[index][foundIndex][`${key}`]
      ) {
        this.cardListStore.cardList[index][foundIndex][`${key}`] =
          card[`${key}`];
      }
    });
  }

  deleteCard(id: string, index) {
    const foundIndex = this.cardListStore.cardList[index].findIndex(
      c => c.id === id
    );
    this.cardListStore.cardList[index].splice(foundIndex, 1);
  }
}
