import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "./authentificationToken";
import {AuthLoginResponse} from "../app/components/forms/login/loginresponse";
import {
  BuyBookRequest,
  GetAllBookByUserResponse,
  GetBookByUserCurrentlyReadingResponse,
  GetBookByUserReadResponse,
  GetBookByUserResponse,
  PaymentInfoRequest

} from "../app/service/authentification.model";
import {Observable, timestamp} from "rxjs";
import {SignalRService} from "../app/service/signal-r.service";
import {AuthLoginRequest} from "../app/components/forms/login/loginrequest";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = `https://localhost:7162/`;

  constructor(private httpClient:HttpClient) { }

  login(login: AuthLoginRequest) {
    login.signalRConnectionId = SignalRService.ConnectionId;
    console.log(login.signalRConnectionId);
    return this.httpClient.post<AuthLoginResponse>(`${this.apiUrl}Login`, login);
  }

  Register(register:RegisterRequest){
    return this.httpClient.post(`${this.apiUrl}register`, register);
  }

  GetBookUserWantToRead(id:number | undefined){
    return this.httpClient.get<GetBookByUserResponse>(
      `${this.apiUrl}GetBookByUser${id}`
    )
  }
  GetAllBooksUser(id:number |undefined)
  {
    return this.httpClient.get<GetAllBookByUserResponse>(
      `${this.apiUrl}GetAllBooksUser${id}`
    )
  }
  GetBookUserCurrentlyReading(id:number |undefined)
  {
    return this.httpClient.get<GetBookByUserCurrentlyReadingResponse>(
      `${this.apiUrl}CurrentlyReading${id}`
    )
  }
  GetBookUserRead(id:number |undefined)
  {
    return this.httpClient.get<GetBookByUserReadResponse>(
      `${this.apiUrl}Read${id}`
    )
  }

  BuyBook(userId: number | undefined, bookId: number, paymentInfo: PaymentInfoRequest): Observable<number> {
    const request: BuyBookRequest = {
      userId,
      bookId,
      paymentInfo
    };

    return this.httpClient.post<number>(`${this.apiUrl}BuyBook`, request);
  }
}
