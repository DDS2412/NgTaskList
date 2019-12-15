import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { APIService } from "./api.service";
import { UserInfo } from "../models/userInfo";
import { InitializerService } from './initializer.service';

@Injectable()
export class UserInfoResolver implements Resolve<Observable<UserInfo>> {
  constructor(private apiService: APIService, private initializerService: InitializerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfo> {
    this.initializerService.loadAllBoardsInfo();
    return this.apiService.getUserInfo();
  }
}
