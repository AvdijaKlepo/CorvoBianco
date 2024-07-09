import {Component, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {MatCard, MatCardContent, MatCardXlImage} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {GetBookDetailPageResponse} from "../../service/book.model";
import {BookService} from "../../service/book.service";
import {MatDialog} from "@angular/material/dialog";
import {EditBookComponent} from "../forms/edit-book/edit-book.component";
import {EditBookCoverComponent} from "../forms/edit-book-cover/edit-book-cover.component";
import {AuthentificationService} from "../../service/authentification.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {LoginService} from "../../../authentification/login.service";
import {GetAllBookByUserResponseModel, GetUserIdResponse} from "../../service/authentification.model";
import {tap} from "rxjs";
import {AddReviewComponent} from "../forms/add-review/add-review.component";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {BuyBookComponent} from "../forms/buy-book/buy-book.component";

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    MatButton,
    RouterLink,
    DatePipe,
    MatDivider,
    CarouselModule,
    MatCard,
    MatCardContent,
    MatIcon,
    SlicePipe,
    MatCardXlImage,
    NgIf,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgClass,
    NgForOf
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
  protected userBooks!: GetAllBookByUserResponseModel[] | null;
  constructor(private service:BookService, protected route:ActivatedRoute, public dialog:MatDialog,
              protected authService:AuthentificationService,
              protected router:Router,
              protected userService:LoginService) {
  }
  currentBookStatus:string | undefined;
  currentRating: number = 0;
  stars: boolean[] = [false, false, false, false, false];
  ngOnInit(): void {
    this.GetBookDetails().subscribe({
      next: () => {
        this.getUserRating();
        this.getBookStatus();
        console.log(this.currentRating)
      },
      error: (err) => {
        console.error('Failed to get book details', err);
      }
    });
    console.log('Status:',this.currentBookStatus)

  }
  rateBook(rating: number): void {
    this.currentRating = rating;
    this.updateStars(rating);
    if (this.userId && this.bookDetails && this.bookDetails.id) {
      this.authService.rateBook(this.userId, this.bookDetails.id, rating).subscribe({
        next: () => {
          console.log('Rating submitted successfully');
        },
        error: (err) => {
          console.error('Failed to submit rating', err);
        }
      });
    } else {
      console.error('User ID or Book Details are not defined');
    }
  }

  protected GetBookDetails() {
    return this.service.GetBookDetails(this.route.snapshot.params['id']).pipe(
      tap((x) => {
        this.bookDetails = x;
      })
    );
  }
  private getUserRating(): void {
    if (this.userId && this.bookDetails && this.bookDetails.id) {

        this.authService.getUserRating(this.bookDetails.id, this.userId).subscribe({
          next: (rating) => {
            if (rating !== 0) {
              this.currentRating = rating;
              this.updateStars(rating);
              console.log('Rating:', rating)
            } else {
              console.log("No rating was found");
            }
          },

          error: (err) => {
            console.error('Failed to get user rating', err);
          }


        });

    }

  }
  private updateStars(rating: number): void {
    this.stars = this.stars.map((_, index) => index < rating);
  }

  AddBookStatus(status: string){
    if (this.userId && this.bookDetails && this.bookDetails.id) {
      this.authService.addBookStatus(this.userId, this.bookDetails.id, status).subscribe((x) => {
        this.currentBookStatus = status;
      });

    } else {
      console.error('User ID or Book Details are not defined');
    }
  }
  getBookStatus(){

      this.authService.getBookStatus(this.userId,this.bookDetails.id).subscribe((x)=>{
        this.currentBookStatus=x.status;
        console.log('Status2:' ,this.currentBookStatus)
      })

  }



  bookDetails!: GetBookDetailPageResponse;
  userId:number | undefined=this.authService.getAuthorizationToken()?.userCertificateId;
  sliceOptions  = {
    start: 0,
    end: 544,
    default: 800
  }

  value:any;
  customOptions:OwlOptions={
    items:4 ,
    autoWidth:true,
    nav:true,
    mouseDrag:false,
    touchDrag:false,
    pullDrag:false,
    slideBy:4,
    smartSpeed:300,
    dots:false,
    loop:false,
    lazyLoad:true,
    navText:['<','>']

  }
  public Hidden=true;


  seeMore($event: any) {
    // @ts-ignore
    this.sliceOptions.end=this.sliceOptions.end?undefined:this.sliceOptions.default;
  }
  setLocation(){
    // @ts-ignore
    document.getElementById('seeMore').style.display='none';
  }

  openAddBookCoverDialog(bookDetails: object) {
    const dialogRef = this.dialog.open(EditBookComponent,
      {
        data:{
          title:this.bookDetails.title,
          author:this.bookDetails.author,
          authorId:this.bookDetails.authorId,
          description:this.bookDetails.description,
          pageCount:this.bookDetails.pageCount,
          published:this.bookDetails.published,
          seriesId:this.bookDetails.seriesId,
          series:this.bookDetails.series,
          genres:this.bookDetails.genres,
          id:this.bookDetails.id,
        }
      }).afterClosed().subscribe(()=>{
      this.GetBookDetails();
    })
  }

  openEditBookCoverDialog() {
    this.dialog.open(EditBookCoverComponent,
      {
        data:{
          bookCover:this.bookDetails.bookCover,
          title:this.bookDetails.title,
          author:this.bookDetails.author,
          authorId:this.bookDetails.authorId,
          description:this.bookDetails.description,
          pageCount:this.bookDetails.pageCount,
          published:this.bookDetails.published,
          seriesId:this.bookDetails.seriesId,
          series:this.bookDetails.series,
          genres:this.bookDetails.genres,
          genresId:this.bookDetails.genresId,
          id:this.bookDetails.id,
        }
      }).afterClosed().subscribe(()=>{

      location.reload()
    })
  }

  addToWantToRead() {
    if(this.userId!=null) {
      this.authService.addBookWantToRead(this.userId, this.bookDetails.id).subscribe((x) => {
        this.reloadBook(this.bookDetails.id)
        alert("Book Added to shelf Want to Read! Happy Reading!");


      })
    }
  }
  addToCurrentyReading() {
    this.authService.addBookCurrentlyReading(this.userId,this.bookDetails.id).subscribe((x)=>{
      this.reloadBook(this.bookDetails.id)
      alert("Book Added to shelf Currently Reading! Happy Reading!");


    })
  }
  addToRead() {
    this.authService.addBookRead(this.userId,this.bookDetails.id).subscribe((x)=>{
      this.reloadBook(this.bookDetails.id)
      alert("Book Added to shelf Read!");
    })
  }





  protected readonly location = location;


  reloadBook(id:number) {
    this.router.navigateByUrl('/book-details/'+id).then(x=>{
      this.GetBookDetails().subscribe(() => {
        this.getBookStatus();
        this.getUserRating();
      });
    })
  }

  openReviewDialog() {
    this.dialog.open(AddReviewComponent,
      {
        data:{
          title:this.bookDetails.title,
          author:this.bookDetails.author,
          series:this.bookDetails.series,
          genres:this.bookDetails.genres,
          id:this.bookDetails.id,
          rating:this.bookDetails.rating,


        }
      })
  }

  protected readonly open = open;
  private user!: GetUserIdResponse;

  openBuyBookDialog() {
    this.dialog.open(BuyBookComponent,
      {
        data:{
          title:this.bookDetails.title,
          author:this.bookDetails.author,
          series:this.bookDetails.series,
          genres:this.bookDetails.genres,
          id:this.bookDetails.id,
          rating:this.bookDetails.rating,
        }
      })
  }

  private GetUser() {
    this.authService.getUserId(this.userId).subscribe((x)=>{
      this.user=x;
    })
  }

  deleteRating(userId: number | undefined, bookId: number) {
    this.authService.deleteRating(userId,bookId).subscribe(()=>{
      alert("Rating deleted!")
    })
  }

  removeStatus(userId:number|undefined, bookId: number,status:string | undefined) {
    this.authService.removeStatus(userId,this.bookDetails.id,this.currentBookStatus).subscribe(()=>{
      alert("Status deleted!");
      this.getBookStatus();
    })
  }
}
