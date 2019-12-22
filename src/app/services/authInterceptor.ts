import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone();

    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) console.log("Server response");
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              console.log("Unauthorized");
              window.location.reload();
            }
          }
        }
      )
    );
  }
}
