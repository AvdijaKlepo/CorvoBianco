import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddArticleRequest, GetArticleResponse, GetArticleResponseModel} from "./article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiUlr = `https://localhost:7162/`;
  constructor(private httpClient:HttpClient) { }

  GetArticle()
  {
    return this.httpClient.get<GetArticleResponse>(
      `${this.apiUlr}GetArticles`
    );
  }
  AddArticle(article:AddArticleRequest)
  {
    return this.httpClient.post(
      `${this.apiUlr}AddArticle`,
      article
    )
  }
  GetArticleDetails(id:number)
  {
    return this.httpClient.get<GetArticleResponseModel>
    (
      `${this.apiUlr}GetArticleDetail${id}`
    )
  }
}
