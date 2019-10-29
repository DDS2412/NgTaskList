import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class APIService {
  API_KEY = 'ea1fbd7a569b0553393d52b9b2b75e28';
  TOKEN = '0cf7af36b9d8f08bdf148d311daca177c6c311dda93c6ccdc20f19b9102dd24b';

  constructor(private httpClient: HttpClient) {}

  public getCards() {
    return this.httpClient.get(`https://api.trello.com/1/boards/ZtxD09G7/cards?fields=all&key=${this.API_KEY}&token=${this.TOKEN}`);
  }

  public getBatch() {
    return this.httpClient.get(`https://api.trello.com/1/batch/?urls=/boards/ZtxD09G7/cards?fields=all,/boards/ZtxD09G7/members/&key=${this.API_KEY}&token=${this.TOKEN}`);
  }
}
