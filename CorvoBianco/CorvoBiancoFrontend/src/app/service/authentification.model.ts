import {User} from "../../authentification/authentificationToken";
import {Book} from "./author.model";

export interface GetUserIdResponse {
  id: number;
  name: string;
  lastName: string;
  birthDate: string;
  profileImage: string | null;
}
export interface AddBookUserRequest {
  userId: number | undefined;
  bookId: number;
}
export interface AddBookStatusRequest {
  userId: number;
  bookId: number;
  status: string;
}
export interface GetBookStatusResponseModel {
  status: string | undefined;
}
export interface RateBookRequest {
  userId: number;
  rating: number;
}


export interface GetReviewResponse {
  reviews: GetReviewResponseModel[];
}


export interface GetReviewResponseModel {
  id: number;
  userName: string;
  userLastName: string;
  rating: number;
  review: string;
  user: User;
  book:Book;
  bookSeries:string
  authorName:string
}
export interface GetUserResponseModel {
  id: number;
  name: string | null;
  lastName: string | null;
  admin_Name: string | null;
  admin_LastName: string | null;
  birthDate: string;
  profileImage: string | null;
  username: string;
  password: string;
}
export interface BuyBookRequest {
  userId: number | undefined;
  bookId: number;
  paymentInfo: PaymentInfoRequest;
}

export interface PaymentInfoRequest {
  cardholderName: string;
  cardType: string;
  last4Digits: string;
  expirationDate: string;
  cardToken: string;
}
export interface GetPurchasesResponse {
  orderId:number;
  userId: number;
  bookId: number;
  paymentInfo: PaymentInfoResponse;
  title:string;
  author:string;
  rating:number | null;
  series:string;
  user:string;
  isPurchased:boolean
}

export interface PaymentInfoResponse {
  cardholderName: string;
  cardType: string;
  last4Digits: string;
  expirationDate: string;
  cardToken: string;
}


export interface GetAllBookByUserResponseModel {
  id: number;
  title: string;
  author: string;
  series: string | null;
  rating: number | null;
  ratingCount: number | null;
  bookCover: string | null;
  genre: string;
}
export interface GetAllBookByUserResponse {
  allUserBooks: GetAllBookByUserResponseModel[] | null;
}

export interface GetBookByUserResponseModel {
  id: number;
  title: string;
  author: string;
  series: string | null;
  rating: number | null;
  ratingCount: number | null;
  bookCover: string | null;
  genre: string;
}

export interface GetBookByUserResponse {
  userWantToRead: GetBookByUserResponseModel[] | null;
}

export interface GetBookByUserCurrentlyReadingResponseModel {
  id: number;
  title: string;
  author: string;
  series: string | null;
  rating: number | null;
  ratingCount: number | null;
  bookCover: string | null;
  genre: string;
}

export interface GetBookByUserCurrentlyReadingResponse {
  userCurrentlyReading: GetBookByUserCurrentlyReadingResponseModel[] | null;
}

export interface GetBookByUserReadResponseModel {
  id: number;
  title: string;
  author: string;
  series: string | null;
  rating: number | null;
  ratingCount: number | null;
  bookCover: string | null;
  genre: string;
}

export interface GetBookByUserReadResponse {
  userRead: GetBookByUserReadResponseModel[] | null;
}
