import {Component, OnInit} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {LoginService} from "../../../authentification/login.service";
import {AuthentificationService} from "../../service/authentification.service";
import {
  GetBookByUserCurrentlyReadingResponseModel, GetBookByUserReadResponseModel,
  GetBookByUserResponse,
  GetBookByUserResponseModel,
  GetUserIdResponse
} from "../../service/authentification.model";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [
    MatDivider,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css'
})
export class MyBooksComponent implements OnInit{
  userId=this.authService.getAuthorizationToken()?.userCertificateId;
  allUserBooks:GetBookByUserResponseModel[] | null=[];
  user!: GetUserIdResponse;
  userWantToRead!: GetBookByUserResponseModel[] | null;
  userCurrentlyReading!: GetBookByUserCurrentlyReadingResponseModel[] | null;
  userRead!: GetBookByUserReadResponseModel[] | null;
  allBooksLabelClicked:Boolean=true;
  wantToReadBooksLabelClicked:Boolean=false;
  currentlyReadingBooksLabelClicked:Boolean=false;
  readBooksLabelClicked:Boolean=false;
  constructor(private service:LoginService,private authService:AuthentificationService) {
  }

  ngOnInit(): void {
        this.GetUserById().subscribe(
          (x)=>{
            this.GetAllUserBooks();
            this.GetUserWantToReadBooks();
            this.GetUserCurrentlyReading();
            this.GetUserRead();
          } )

    }

  GetUserById() {
    return this.authService.getUserId(this.userId).pipe(
      tap((x)=>{
        this.user=x;
      })
    )

  }

  GetAllUserBooks() {
    this.service.GetAllBooksUser(this.userId).subscribe((x)=>{
      this.allUserBooks=x.allUserBooks;
    })
  }
  GetUserWantToReadBooks(){
    this.service.GetBookUserWantToRead(this.userId).subscribe((x)=>{
      this.userWantToRead=x.userWantToRead
    })
  }
  GetUserCurrentlyReading(){
    this.service.GetBookUserCurrentlyReading(this.userId).subscribe((x)=>{
      this.userCurrentlyReading=x.userCurrentlyReading
    })
  }
  GetUserRead(){
    this.service.GetBookUserRead(this.userId).subscribe((x)=>{
      this.userRead=x.userRead;
    })
  }

}
