import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { LoginService } from "./services/login.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MainpageComponent } from "./components/mainpage/mainpage.component";
import { LoginformComponent } from "./components/loginform/loginform.component";
import { HeaderComponent } from "./components/header/header.component";
import { FilteringService } from "./services/filtering.service";
import { TableComponent } from "./components/table/table.component";
import { UserInfoResolver } from "./services/userInfo-resolver";
import { ModalComponent } from "./components/modal/modal.component";
import { InitializerService } from "./services/initializer.service";
import { MatSelectModule } from "@angular/material";
import { AnalyticsComponent } from "./components/analytics/analytics.component";
import { AuthInterceptor } from './services/authInterceptor';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    LoginformComponent,
    HeaderComponent,
    TableComponent,
    ModalComponent,
    AnalyticsComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    LoginService,
    FilteringService,
    UserInfoResolver,
    InitializerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
