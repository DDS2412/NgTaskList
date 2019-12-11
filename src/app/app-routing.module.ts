import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { MainpageComponent } from "./components/mainpage/mainpage.component";
import { LoginformComponent } from "./components/loginform/loginform.component";
import { UserInfoResolver } from "./services/userInfo-resolver";
import { AnalyticsComponent } from "./components/analytics/analytics.component"

const routes: Routes = [
  { path: "", component: LoginformComponent },
  {
    path: "mainpage",
    component: MainpageComponent,
    canActivate: [AuthGuard],
    resolve: { userInfo: UserInfoResolver }
  },
  {
    path: "analytics",
    component: AnalyticsComponent,
  },
  { path: "**", canActivate: [AuthGuard], redirectTo: "mainpage" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
