import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { APIService } from "./api.service";
import { UserInfo } from "../models/userInfo";
import { InitializerService } from './initializer.service';

@Injectable()
export class UserInfoResolver implements Resolve<void> {
  constructor(private apiService: APIService, private initializerService: InitializerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.initializerService.loadAllBoardsInfo();
  }
}
