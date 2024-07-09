import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  AddBookRequest,
  AddGenreRequest,
  AddSeriesRequest, GetBookDetailPageResponse,
  GetBookResponse,
  GetGenreResponse,
  GetSeriesResponse, GetSeriesResponseModel
} from "./book.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUlr = `https://localhost:7162/`;

  constructor(private httpClient:HttpClient) { }

  AddBook(book:AddBookRequest) {
    return this.httpClient.post(
      `${this.apiUlr}AddBook`,
      book
    );
  }
  AddGenre(genre:AddGenreRequest)
  {
    return this.httpClient.post(
      `${this.apiUlr}AddGenre`,
      genre
    );
  }
  AddSeries(series:AddSeriesRequest)
  {
    return this.httpClient.post(
      `${this.apiUlr}AddSeries`,
      series
    );
  }
  GetBooks()
  {
    return this.httpClient.get<GetBookResponse>(
      `${this.apiUlr}GetBook`
    );
  }
  GetSeries()
  {
    return this.httpClient.get<GetSeriesResponse>(
      `${this.apiUlr}GetSeries`
    )
  }

  GetGenre()
  {
    return this.httpClient.get<GetGenreResponse>(
      `${this.apiUlr}Genre/GetGenres`
    );
  }
  GetBookDetails(id:number)
  {
    return this.httpClient.get<GetBookDetailPageResponse>(
      `${this.apiUlr}GetBookDetails${id}`
    )
  }
  GetSeriesDetails(id:number)
  {
    return this.httpClient.get<GetSeriesResponseModel>(
      `${this.apiUlr}GetSeriesDetails${id}`
    )
  }
}
