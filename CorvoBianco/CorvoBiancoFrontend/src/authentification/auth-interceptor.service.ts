import { Injectable } from '@angular/core';
import {AuthentificationService} from "../app/service/authentification.service";
import {HttpHandler, HttpRequest} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private auth:AuthentificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getAuthorizationToken()?.value??"";

    const authReq = request.clone({
      headers:request.headers.set("my-auth-token" , authToken)
    });

    return next.handle(authReq);
  }
}
