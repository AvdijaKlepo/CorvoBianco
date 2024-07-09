import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {GetArticleResponseModel} from "../../../service/article.model";
import {ArticleService} from "../../../service/article.service";
import {AuthentificationService} from "../../../service/authentification.service";
import {LoginService} from "../../../../authentification/login.service";
import {
  GetAllBookByUserResponseModel,
  GetBookByUserCurrentlyReadingResponseModel, GetBookByUserReadResponseModel,
  GetBookByUserResponseModel
} from "../../../service/authentification.model";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    MatCard,
    RouterLink,
    MatCardContent,
    MatCardTitleGroup,
    DatePipe,
    NgOptimizedImage,
    MatCardImage,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    MatDivider
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{
  article:GetArticleResponseModel[]=[];
  allArticles: GetArticleResponseModel[]=[];
  userId=this.authService.getAuthorizationToken()?.userCertificateId;
  protected userCurrentlyReading!: GetBookByUserCurrentlyReadingResponseModel[] | null;
  protected userWantToRead!: GetBookByUserResponseModel[] | null;
  protected userRead!: GetBookByUserReadResponseModel[] | null;
  protected allUserBooks!: GetAllBookByUserResponseModel[] | null;
  constructor(private service:ArticleService,private authService:AuthentificationService,
              private userService:LoginService) {
  }
  ngOnInit(): void {
      this.loadArticles();
      this.getUserCurrentlyReading();
      this.getUserWantToRead();
      this.getUserRead();
      this.getAllUserBooks();
  }

  private getAllUserBooks() {
    this.userService.GetAllBooksUser(this.userId).subscribe((x)=>{
      this.allUserBooks=x.allUserBooks
    })
  }

  private getUserRead() {
    this.userService.GetBookUserRead(this.userId).subscribe((x)=>{
      this.userRead=x.userRead
    })
  }

  private getUserWantToRead() {
    this.userService.GetBookUserWantToRead(this.userId).subscribe((x)=>{
      this.userWantToRead=x.userWantToRead
    })
  }

  private getUserCurrentlyReading() {
    this.userService.GetBookUserCurrentlyReading(this.userId).subscribe((x)=>{
      this.userCurrentlyReading=x.userCurrentlyReading;
    })
  }
  private loadArticles(){
    this.service.GetArticle().subscribe((x)=>{
      this.article = x.articles;
    })
  }


}
