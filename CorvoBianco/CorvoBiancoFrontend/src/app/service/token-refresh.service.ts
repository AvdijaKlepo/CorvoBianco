import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthentificationService} from "./authentification.service";
import {interval, switchMap, takeWhile} from "rxjs";
import {AuthenticationToken} from "../../authentification/authentificationToken";

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {
  protected apiUlr = `https://localhost:7162/`;
  constructor(private httpClient:HttpClient,private service:AuthentificationService) { }

  startTokenRefreshInteval(oldToken:string){
    this.refreshAuthToken(oldToken);

    interval(30*1000).pipe(
      takeWhile(()=>this.service.isLogged()),
      switchMap(()=>this.refreshAuthToken(oldToken))
    ).subscribe();
  }

   refreshAuthToken(oldToken: string) {
    let headers = {
      'my-auth-token':oldToken
    };
    return this.httpClient.post<any>(
      `${this.apiUlr}CheckJwtRefresh`,
      {oldToken: oldToken},{headers:headers}
    ).pipe(
      switchMap(resp=>{
        if (resp && resp.newToken){
          let newToken:AuthenticationToken ={
            id:resp.authenticationToken.id,
            value:resp.newToken,
            userCertificateId:resp.authenticationToken.userCertificateId,
            userCertificate:resp.authenticationToken.userCertificate,
            evidentedTime:resp.authenticationToken.evidentedTime,
            ipAddress:resp.authenticationToken.ipAddress,
            isTwoFactorUnclocked:resp.authenticationToken.isTwoFactorUnclocked
          };

          this.service.setLoggedUser(newToken);
          window.localStorage.setItem('my-auth-token',JSON.stringify(newToken));

          return resp;
        }
        else {
          return resp;
        }
      })
    )

  }
}
