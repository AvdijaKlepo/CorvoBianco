import { Injectable } from '@angular/core';

import {AddAuthorRequest, GetAuthorResponse, GetAuthorResponseModel} from "./author.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  apiUrl = `https://localhost:7162/`
  constructor(private httpClient:HttpClient) { }


  GetAuthors()
  {
    return this.httpClient.get<GetAuthorResponse>(
      `${this.apiUrl}GetAuthors`
    );
  }

  GetAuthorDetails(id:number)
  {
    return this.httpClient.get<GetAuthorResponseModel>(
      `${this.apiUrl}GetAuthorDetails${id}`
    )
  }

  DeleteAuthor(id:number)
  {
    return this.httpClient.delete(
      `${this.apiUrl}Author/DeleteAuthor?AuthorId=${id}`
    );
  }

  AddAuthor(author:AddAuthorRequest)
  {
    return this.httpClient.post(
      `${this.apiUrl}AddAuthor`,
      author
    );
  }
}
