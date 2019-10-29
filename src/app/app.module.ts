import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { LoginService } from "./services/login.service";
import { HttpClientModule } from "@angular/common/http";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MainpageComponent } from "./components/mainpage/mainpage.component";
import { LoginformComponent } from "./components/loginform/loginform.component";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    LoginformComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, AuthGuardService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
