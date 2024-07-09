import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationToken, User} from "../../authentification/authentificationToken";
import {GetAuthorResponseModel} from "./author.model";
import {
  AddBookStatusRequest,
  AddBookUserRequest,
  GetBookStatusResponseModel, GetPurchasesResponse, GetReviewResponse, GetReviewResponseModel,
  GetUserIdResponse, GetUserResponseModel, RateBookRequest
} from "./authentification.model";
import {catchError, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient,private router:Router,private bar:MatSnackBar) { }
  apiUrl = `https://localhost:7162/`
  isLogged():boolean{
    return this.getAuthorizationToken() !=null;
  }
  getAuthorizationToken():AuthenticationToken | null {
    let tokenString = window.localStorage.getItem('my-auth-token')??"";
    try {
      return JSON.parse(tokenString);
    }
    catch(error){
      return null;
    }
  }
  getUser():User | null{
    let tokenString = window.localStorage.getItem('my-auth-token')??"";
    try {
      return JSON.parse(tokenString);
    }
    catch(error){
      return null;
    }
  }
  isAdmin():boolean {
    return this.getAuthorizationToken()?.userCertificate.isAdmin ?? false
  }
  isUser():boolean {
    return this.getAuthorizationToken()?.userCertificate.isUser ?? false
  }


  logOutUser (){
    window.localStorage.removeItem('my-auth-token');
    this.router.navigate(['fake'])
    this.bar.open('Logged out')._dismissAfter(2000)

  }
  setLoggedUser(token:AuthenticationToken){
    if(token != null){
      window.localStorage.setItem('my-auth-token',JSON.stringify(token));
    }
  }

  getUserId(id:number | undefined){
    return this.http.get<GetUserIdResponse>(
      `${this.apiUrl}GetUserById${id}`
    )
  }

  addBookWantToRead(userId: number | undefined, bookId: number) {
    return this.http.post<AddBookUserRequest>(
      `${this.apiUrl}WantToRead`,
      {userId: userId, bookId: bookId} // Pass userId and bookId as properties of an object
    );
  }
  addBookCurrentlyReading(userId: number | undefined, bookId: number) {
    return this.http.post<AddBookUserRequest>(
      `${this.apiUrl}AddCurrentlyReading`,
      {userId: userId, bookId: bookId} // Pass userId and bookId as properties of an object
    );
  }
  addBookRead(userId: number | undefined, bookId: number) {
    return this.http.post<AddBookUserRequest>(
      `${this.apiUrl}AddRead`,
      {userId: userId, bookId: bookId} // Pass userId and bookId as properties of an object
    );
  }

  addBookStatus(userId: number | undefined, bookId: number, status: string  | undefined) {
    return this.http.post<AddBookStatusRequest>(
      `${this.apiUrl}AddBookStatus`,
      {userId: userId, bookId: bookId,status:status}
    )
  }
  getBookStatus(userId: number | undefined, bookId: number) {
    return this.http.get<GetBookStatusResponseModel>(
      `${this.apiUrl}GetBookStatus?UserId=${userId}&BookId=${bookId}`, {
        params: {
          userId: userId?.toString() || '',
          bookId: bookId.toString()
        }
      }
    );
  }

  rateBook(userId: number, bookId: number, rating: number) {
    return this.http.post(
      `${this.apiUrl}${bookId}/rate`,{userId,rating}
    );
  }
  getUserRating(bookId: number, userId: number): Observable<number> {
    return this.http.get<{ rating: number }>(`${this.apiUrl}${bookId}/user-rating/${userId}`)
      .pipe(
        map(response => response.rating),
        catchError(error => {
          console.error('Failed to get user rating', error);
          return of(0); // Default rating if error occurs
        })
      );
  }
  submitReview(bookId: number, userId: number | undefined, reviewRequest: { review: string }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${bookId}/add/${userId}/review`, reviewRequest);
  }
  getReviews() {
    return this.http.get<GetReviewResponse>(`${this.apiUrl}GetReviews`);
  }
  getUserDetail(id:number | undefined){
    return this.http.get<GetUserResponseModel>(
      `${this.apiUrl}GetUserDetails${id}`
    )
  }
  getAdminDetails(id:number)
  {
    return this.http.get<GetUserResponseModel>(
      `${this.apiUrl}GetAdminById${id}`
    )
  }
  getOrders()
  {
    return this.http.get<GetPurchasesResponse[]>(
      `${this.apiUrl}GetPurchases`
    )
  }
  shipOrder(orderId: number) {
    return this.http.post(`${this.apiUrl}OrderShipped`, orderId);
  }
  deleteRating(userId: number | undefined, bookId: number){
    return this.http.delete(`${this.apiUrl}${bookId}/DeleteRating/${userId}`);
  }
  deleteReview(userId:number|undefined, bookId: number) {
    return this.http.delete(`${this.apiUrl}${bookId}/DeleteReview/${userId}`);
  }
  removeStatus(userId:number|undefined,bookId:number,status:string | undefined){
    const body = { userId, bookId, status };
    return this.http.delete(`${this.apiUrl}DeleteStatus`,{body})
  }


}
