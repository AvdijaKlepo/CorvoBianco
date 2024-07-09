import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {
  GetAllBookByUserResponseModel,
  GetBookByUserCurrentlyReadingResponseModel, GetBookByUserReadResponseModel,
  GetBookByUserResponseModel, GetReviewResponseModel, GetUserIdResponse
} from "../../service/authentification.model";
import {AuthentificationService} from "../../service/authentification.service";
import {LoginService} from "../../../authentification/login.service";
import {ArticleService} from "../../service/article.service";
import {GetArticleResponseModel} from "../../service/article.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {BookService} from "../../service/book.service";
import {GetBookResponseModel} from "../../service/book.model";
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {MatButton} from "@angular/material/button";
import {NavbarComponent} from "../navbar/navbar.component";
import {LoginComponent} from "../forms/login/login.component";
import {tap} from "rxjs";

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
    MatDivider,
    NgOptimizedImage,
    RouterLink,
    MatCardContent,
    MatCard,
    NgForOf,
    CarouselModule,
    MatButton,
    NavbarComponent,
    LoginComponent
  ],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('carousel') carousel!: ElementRef;
  customOptions: OwlOptions = {
    items: 1,
    autoWidth: true,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    slideBy: 1,
    smartSpeed: 300,
    dots: false,
    loop: false,
    lazyLoad: true,
    navText: ['<', '>']
  }

  userId = this.service.getAuthorizationToken()?.userCertificateId;
  protected userCurrentlyReading!: GetBookByUserCurrentlyReadingResponseModel[] | null;
  protected userWantToRead!: GetBookByUserResponseModel[] | null;
  protected userRead!: GetBookByUserReadResponseModel[] | null;
  protected allUserBooks!: GetAllBookByUserResponseModel[] | null;
  protected article: GetArticleResponseModel[] = [];
  protected reviews!: GetReviewResponseModel[];
  stars: boolean[] = [false, false, false, false, false];
  protected books: GetBookResponseModel[] = [];
  currentIndex = 0;
  loadBooks: any = null;
  private user!: GetUserIdResponse;

  constructor(protected service: AuthentificationService, private userService: LoginService,
              private articleService: ArticleService, private bookService: BookService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
        this.getAllUserBooks();
        this.getUserWantToRead();
        this.getUserCurrentlyReading();
        this.getUserRead();
    }

  ngAfterViewInit(): void {
      this.updateCarousel();
    }

  private updateCarousel() {
    const carouselElement = this.carousel.nativeElement as HTMLElement;
    const offset = -this.currentIndex * carouselElement.offsetWidth;
    carouselElement.style.transform = `translateX(${offset}px)`;
  }
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  nextSlide() {
    if (this.currentIndex < this.books.slice(4,7).length - 1) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }
    ngOnInit(): void {
      this.getUserCurrentlyReading();
      this.getUserWantToRead();
      this.getUserRead();
      this.getAllUserBooks();

      this.getArticle();
      this.getReviews();
      this.getBooks();
    }


  private getBooks() {
    this.bookService.GetBooks().subscribe((x)=>{
      this.books=x.books;
    })
  }
  private updateStars(rating: number): void {
    this.stars = this.stars.map((_, index) => index < rating);
  }
  private getReviews() {
    this.service.getReviews().subscribe((x)=>{
       this.reviews=x.reviews;
    })
  }
  protected getAllUserBooks() {
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

  private getArticle() {
    this.articleService.GetArticle().subscribe((x)=>{
      this.article=x.articles;
    })
  }

  deleteReview(userId: number | undefined, bookId: number) {
    this.service.deleteReview(userId,bookId).subscribe(()=>{
      alert("Review deleted!");
    })
  }



}
