export interface AddAuthorRequest {
  id: number;
  firstName: string;
  lastName: string;
  born: string;
  bio: string;
  profilePicture: string | null;
}



export interface GetAuthorResponse {
  authors: GetAuthorResponseModel[];
}



export interface GetAuthorResponseModel {
  id: number;
  firstName: string;
  lastName: string;
  born: string;
  bio: string;
  profilePicture: string | null;
  bookId: number;
  books: Book[] | null;
}



//Imported Tables Bellow




export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  born: string;
  bio: string;
  profilePicture: string | null;
  books: Book[] | null;
  series: Series[] | null;
}


export interface Series {
  id: number;
  seriesName: string;
  books: Book[] | null;
  authorId: number;
  author: Author | null;
}


export interface Genre {
  id: number;
  genreName: string | null;
  books: Book[] | null;
}


export interface Book {
  id: number;
  title: string;
  authorId: number;
  author: Author;
  rating: number | null;
  ratingCount: number | null;
  description: string;
  pageCount: number;
  published: string;
  bookCover: string | null;
  genreId: number;
  genre: Genre;
  seriesId: number | null;
  series: Series | null;
}
