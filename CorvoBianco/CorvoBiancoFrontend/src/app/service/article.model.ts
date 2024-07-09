import {Book} from "./author.model";

export interface AddArticleRequest {
  id: number;
  title: string;
  preview: string | null;
  posted: string;
  articleImage: string | null;
  articleDescription: string;
  genreId: number | null;
}



export interface GetArticleResponse {
  articles: GetArticleResponseModel[];
}

export interface GetArticleResponseModel {
  id: number;
  title: string;
  articlePreview: string;
  posted: string;
  articleImage: string;
  articleDescription: string;
  genreName: string;
  books: Book[];
}


export interface GetArticleDetailResponse {
  id: number;
  title: string;
  articlePreview: string;
  posted: string;
  articleImage: string;
  articleDescription: string;
  books: Book[];
  author: string;
  genreId: number | null;
  genre: string;
}
