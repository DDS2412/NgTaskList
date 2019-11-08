import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { APIService } from "./api.service";

@Injectable()
export class UserInfoResolver implements Resolve<Observable<string>> {
  constructor(private apiService: APIService) {}

  resolve(): Observable<any> {
    return this.apiService.getUserInfo();
  }
}
