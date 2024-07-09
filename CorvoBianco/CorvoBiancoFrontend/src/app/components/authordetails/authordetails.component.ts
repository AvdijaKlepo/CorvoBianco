import {Component, OnInit} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {GetAuthorResponseModel} from "../../service/author.model";
import {AuthorService} from "../../service/author.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatePipe, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {EditauthordetailsComponent} from "../forms/edit-author-details/editauthordetails.component";
import {EditAuthorImageComponent} from "../forms/edit-author-image/edit-author-image.component";
import {AuthentificationService} from "../../service/authentification.service";

@Component({
  selector: 'app-authordetails',
  standalone: true,
  imports: [
    MatDivider,
    DatePipe,
    NgOptimizedImage,
    MatButton,
    SlicePipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './authordetails.component.html',
  styleUrl: './authordetails.component.css'
})
export class AuthordetailsComponent implements OnInit {
  authorDetails!: GetAuthorResponseModel;
  sliceOptions  = {
    start: 0,
    end: 800,
    default: 800
  }
  constructor(private service:AuthorService, private route:ActivatedRoute, private dialog:MatDialog,
              protected authService:AuthentificationService) {
  }
  ngOnInit(): void {
      this.GetAuthorDetails();
  }
  GetAuthorDetails()
  {
    this.service.GetAuthorDetails(this.route.snapshot.params['id']).subscribe((x)=>{
      this.authorDetails = x;
    })
  }
  seeMore($event: any) {
    // @ts-ignore
    this.sliceOptions.end=this.sliceOptions.end?undefined:this.sliceOptions.default;
  }


  openEditAuthorDialog(authorDetails: GetAuthorResponseModel) {
    this.dialog.open(EditauthordetailsComponent,
      {
        data:{
          firstName:authorDetails.firstName,
          lastName:authorDetails.lastName,
          bio:authorDetails.bio,
          born:authorDetails.born,
          id:authorDetails.id,
          books:authorDetails.books,
          profileImage:authorDetails.profilePicture
        }
      }).afterClosed().subscribe(()=> {
      this.GetAuthorDetails();
    })

  }

  openEditAuthorImage() {
    this.dialog.open(EditAuthorImageComponent,
      {
        data:{
          firstName: this.authorDetails.firstName,
          lastName: this.authorDetails.lastName,
          bio: this.authorDetails.bio,
          born: this.authorDetails.born,
          id: this.authorDetails.id,
          books: this.authorDetails.books,
          profileImage: this.authorDetails.profilePicture
        }
      }).afterClosed().subscribe(()=>{
      location.reload()
    })
  }
}
