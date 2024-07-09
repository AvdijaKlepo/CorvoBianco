import {Book} from "../app/service/author.model";

export interface UserCertificate {
  id: number;
  username: string;
  isAdmin: boolean;
  isUser: boolean;
  isTwoFactorActive: boolean;
}



export interface User extends UserCertificate {
  name: string;
  lastName: string;
  birthDate: string;
  profileImage: string | null;
  wantToReadBooks: WantToRead[] | null;
  currentlyReadingBooks: CurrentlyReading[] | null;
  readBooks: Read[] | null;
  bookStatuses: BookStatus[] | null;
  userRatings: UserRating[];
}

export interface BookStatus {
  id: number;
  userId: number | null;
  user: User | null;
  bookId: number | null;
  book: Book | null;
  status: string;
}

export interface UserRating {
  id: number;
  bookId: number;
  book: Book;
  userId: number;
  user: User;
  rating: number;
  review: string | null;
}


export interface WantToRead {
  id: number;
  userId: number | null;
  user: User | null;
  bookId: number | null;
  book: Book | null;
}
export interface CurrentlyReading {
  id: number;
  userId: number | null;
  user: User | null;
  bookId: number | null;
  book: Book | null;
}
export interface Read {
  id: number;
  userId: number | null;
  user: User | null;
  bookId: number | null;
  book: Book | null;
}

export interface AuthenticationToken {
  id: number;
  value: string;
  userCertificateId: number;
  userCertificate: UserCertificate;
  evidentedTime: string;
  ipAddress: string | null;
  isTwoFactorUnclocked: boolean;
}

export interface RegisterRequest {
  id: number;
  username: string;
  password: string;
  name: string;
  lastName: string;
  birthDate: string;
  profilePicture: string | null;
}
