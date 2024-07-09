import {Book} from "./author.model";

export interface AddBookRequest {
  id: number;
  title: string;
  authorId: number;
  series: number;
  rating: number | null;
  ratingCount: number | null;
  description: string;
  genreId: number;
  pageCount: number;
  published: string;
  bookCover: string | null;
}
export interface GetBookResponseModel {
  id: number;
  title: string;
  author: string;
  series: string | null;
  rating: number | null;
  ratingCount: number | null;
  bookCover: string;
  genre: string;
}


export interface GetBookResponse {
  books: GetBookResponseModel[];
}
export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  born: string;
  bio: string;
  profilePicture: string | null;
  books: Book[] | null;
  bookId: number;
}
export interface AddGenreRequest {
  id: number;
  genreName: string;
}
export interface AddSeriesRequest {
  id: number;
  seriesName: string;
  authorId: number;
}


export interface GetSeriesResponse {
  series: GetSeriesResponseModel[];
}

export interface GetSeriesResponseModel {
  id: number;
  seriesName: string;
  books: Book[];
  author: Author;
}



export interface GetGenreResponse {
  genres: GetGenreResponseModel[];
}

export interface GetGenreResponseModel {
  id: number;
  genre: string;
  books: Book[] | null;
}


export interface GetBookDetailPageResponse {
  id: number;
  title: string;
  author: string;
  authorId: number;
  series: string;
  seriesId: number | null;
  rating: number | null;
  ratingCount: number | null;
  description: string;
  genres: string;
  genresId: number;
  pageCount: number;
  published: string;
  bookCover: string;
  authorDetails: Author;
  authorBooks: Book[];
  authorBio: string;
}
