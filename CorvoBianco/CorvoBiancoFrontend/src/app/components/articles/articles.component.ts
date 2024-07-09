import {Component, OnInit} from '@angular/core';
import {GetArticleResponseModel} from "../../service/article.model";
import {ArticleService} from "../../service/article.service";
import {MatToolbar} from "@angular/material/toolbar";
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

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    MatToolbar,
    MatCard,
    RouterLink,
    NgOptimizedImage,
    MatCardContent,
    MatCardTitleGroup,
    DatePipe,
    MatCardImage,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit{
  article: GetArticleResponseModel[]=[];
  allArticles: GetArticleResponseModel[]=[];
  constructor(private service:ArticleService) {
  }
  ngOnInit(): void {
    this.loadArticle();
    this.loadAllArticles();
  }

  private loadAllArticles() {
    this.service.GetArticle().subscribe((x)=>
      this.allArticles=x.articles
    )
  }

  private loadArticle() {
    this.service.GetArticle().subscribe((x)=>{
      this.article=x.articles;
    })
  }

}
