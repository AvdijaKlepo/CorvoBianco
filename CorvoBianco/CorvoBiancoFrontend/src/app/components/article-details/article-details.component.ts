import {Component, OnInit} from '@angular/core';
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GetArticleDetailResponse, GetArticleResponseModel} from "../../service/article.model";
import {ArticleService} from "../../service/article.service";
import {MatDialog} from "@angular/material/dialog";
import {EditArticleDetailsComponent} from "../forms/edit-article-details/edit-article-details.component";
import {EditArticleImageComponent} from "../forms/edit-article-image/edit-article-image.component";

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [
    MatMenu,
    MatButton,
    DatePipe,
    NgOptimizedImage,
    MatMenuTrigger,
    RouterLink
  ],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent implements OnInit{
  articleDetail!: GetArticleResponseModel;
  constructor(private service:ArticleService,private route:ActivatedRoute,public dialog:MatDialog) {
  }

  ngOnInit(): void {
        this.getArticleDetails();
    }
  private getArticleDetails() {
    this.service.GetArticleDetails(this.route.snapshot.params['id']).subscribe((x)=>{
      this.articleDetail = x;
    })
  }

  openAddBookCoverDialog(articleDetail: any) {
    const dialogRef = this.dialog.open(EditArticleDetailsComponent,
      {
        data:{
          title:this.articleDetail.title,
          articleDescription:this.articleDetail.articleDescription,
          posted:this.articleDetail.posted,
          articlePreview:this.articleDetail.articlePreview,
          articleImage:this.articleDetail.articleImage,
          id:this.articleDetail.id,
          books:this.articleDetail.books
        }
      }).afterClosed().subscribe(()=>{
      this.getArticleDetails();
    })
  }

  openEditArticleImage() {
    this.dialog.open(EditArticleImageComponent,
      {
        data:{
          title:this.articleDetail.title,
          articleDescription:this.articleDetail.articleDescription,
          posted:this.articleDetail.posted,
          articlePreview:this.articleDetail.articlePreview,
          articleImage:this.articleDetail.articleImage,
          id:this.articleDetail.id,
          books:this.articleDetail.books

        }
      }).afterClosed().subscribe(()=>{
      location.reload();
    })
  }
}
