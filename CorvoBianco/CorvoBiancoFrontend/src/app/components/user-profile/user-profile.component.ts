import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../service/authentification.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {
  GetBookByUserCurrentlyReadingResponseModel, GetBookByUserReadResponseModel,
  GetBookByUserResponseModel, GetReviewResponseModel,
  GetUserIdResponse,
  GetUserResponseModel
} from "../../service/authentification.model";
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {EditUserProfileComponent} from "../forms/edit-user-profile/edit-user-profile.component";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {EditUserImageComponent} from "../forms/edit-user-image/edit-user-image.component";
import {LoginService} from "../../../authentification/login.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatDivider,
    NgOptimizedImage,
    DatePipe,
    RouterLink,
    MatButton,
    NgForOf
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  protected userDetails!: GetUserResponseModel;
  protected adminDetails!: GetUserResponseModel;
  protected allUserBooks:GetBookByUserResponseModel[] | null=[];
  protected userWantToRead: GetBookByUserResponseModel[] | null=[];
  protected userCurrentlyReading: GetBookByUserCurrentlyReadingResponseModel[] | null=[];
  protected userRead: GetBookByUserReadResponseModel[] | null=[];
  protected reviews: GetReviewResponseModel[]=[];
  stars: boolean[] = [false, false, false, false, false];
  userId=this.service.getAuthorizationToken()?.userCertificateId;
  constructor(protected service:AuthentificationService, protected route:ActivatedRoute,
              private dialog:MatDialog, private userService:LoginService) {
  }
    ngOnInit(): void {
        this.getUserInfo();

    }

  GetAllUserBooks() {
    this.userService.GetAllBooksUser(this.userDetails.id).subscribe((x)=>{
      this.allUserBooks=x.allUserBooks;
      console.log(x.allUserBooks)
    })
  }
  GetUserWantToReadBooks(){
    this.userService.GetBookUserWantToRead(this.userDetails.id).subscribe((x)=>{
      this.userWantToRead=x.userWantToRead
    })
  }
  GetUserCurrentlyReading(){
    this.userService.GetBookUserCurrentlyReading(this.userDetails.id).subscribe((x)=>{
      this.userCurrentlyReading=x.userCurrentlyReading
    })
  }
  GetUserRead(){
    this.userService.GetBookUserRead(this.userDetails.id).subscribe((x)=>{
      this.userRead=x.userRead;
    })
  }

  private getAdminInfo() {
    this.service.getAdminDetails(this.route.snapshot.params['id']).subscribe((x)=>{
      this.adminDetails=x;
    })
  }
  private getRating(){
    this.service.getReviews().subscribe((x)=>{
      this.reviews=x.reviews;
    })
  }

  private getUserInfo() {
   return this.service.getUserDetail(this.route.snapshot.params['id']).subscribe((x)=>{
      this.userDetails=x;
      this.GetAllUserBooks();
      this.GetUserWantToReadBooks();
      this.GetUserCurrentlyReading();
      this.GetUserRead();
      this.getRating();
    })
  }

  openDialog() {
    this.dialog.open(EditUserProfileComponent,
      {
        data:{
          name:this.userDetails.name,
          lastName:this.userDetails.lastName,
          birthDate:this.userDetails.birthDate,
          username:this.userDetails.username,
          password:this.userDetails.password,
          id:this.userDetails.id,
        }
      }).afterClosed().subscribe(result => {
        location.reload()
    })
  }

  openEditImageDialog() {
    this.dialog.open(EditUserImageComponent,
      {
        data:{
          name:this.userDetails.name,
          lastName:this.userDetails.lastName,
          birthDate:this.userDetails.birthDate,
          username:this.userDetails.username,
          password:this.userDetails.password,
          id:this.userDetails.id,
          profilePicture:this.userDetails.profileImage
        }
      }).afterClosed().subscribe(result => {
      location.reload()
    })
  }

  deleteReview(userId: number | undefined, bookId: number) {
    this.service.deleteReview(userId,bookId).subscribe((x)=>{
      alert("Review deleted!");
    })
  }
}
