import {Component, OnInit} from '@angular/core';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {MatCard, MatCardContent, MatCardImage, MatCardXlImage} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {GetBookResponse, GetBookResponseModel} from "../../../service/book.model";
import {BookService} from "../../../service/book.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ArticleService} from "../../../service/article.service";
import {GetArticleResponseModel} from "../../../service/article.model";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CarouselModule,
    MatCard,
    RouterLink,
    MatCardContent,
    MatIcon,
    MatCardXlImage,
    MatButton,
    NgOptimizedImage,
    NgIf,
    NgForOf,
    MatCardImage,
    DatePipe
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  protected articles: GetArticleResponseModel[]=[];
  constructor(protected serice:BookService,public dialog:MatDialog,
              private articleService:ArticleService,) {
  }
  ngOnInit(): void {
    this.loadBooks();
    this.getArticles();
  }

  private getArticles() {
    this.articleService.GetArticle().subscribe((x)=>{
      this.articles=x.articles;
    })
  }

  private loadBooks() {
    this.serice.GetBooks().subscribe((x:GetBookResponse)=>{
      this.books=x.books;
    })
  }
  customOptions:OwlOptions={
    items:5,
    autoWidth:false,
    nav:true,
    mouseDrag:false,
    touchDrag:false,
    pullDrag:false,
    slideBy:5,
    smartSpeed:300,
    dots:false,
    loop:false,
    lazyLoad:true,
    navText:['<','>'],

  }
  customOptions2:OwlOptions={
    items:3,
    autoWidth:false,
    nav:true,
    mouseDrag:false,
    touchDrag:false,
    pullDrag:false,
    slideBy:3,
    smartSpeed:300,
    dots:false,
    loop:false,
    lazyLoad:true,
    navText:['<','>'],

  }
  books: GetBookResponseModel[]=[];



  DeleteBook(id:number) {

  }




}
