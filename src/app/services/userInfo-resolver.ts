import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { APIService } from "./api.service";
import { UserInfo } from "../models/userInfo";

@Injectable()
export class UserInfoResolver implements Resolve<Observable<UserInfo>> {
  constructor(private apiService: APIService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfo> {
    return this.apiService.getUserInfo();
  }
}
