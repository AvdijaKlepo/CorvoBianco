import {Component, HostListener, OnInit} from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Router, RouterLink} from "@angular/router";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {UpdatetabComponent} from "../updatetab/updatetab.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthentificationService} from "../../service/authentification.service";
import {
  GetAllBookByUserResponseModel,
  GetBookByUserCurrentlyReadingResponseModel, GetBookByUserReadResponseModel,
  GetBookByUserResponseModel,
  GetUserIdResponse
} from "../../service/authentification.model";
import {SignInComponent} from "../sign-in/sign-in.component";
import {BookService} from "../../service/book.service";
import {GetBookResponseModel} from "../../service/book.model";
import {FormsModule} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";
import {timeout} from "rxjs";
import {LoginService} from "../../../authentification/login.service";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatFormField,
    MatLabel,
    RouterLink,
    MatInput,
    MatButton,
    NgIf,
    FormsModule,
    NgForOf,
    MatDivider,
    NgOptimizedImage

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user!:GetUserIdResponse;
  userId=this.service.getAuthorizationToken()?.userCertificateId;
  protected books!: GetBookResponseModel[];
  searchString: string = '';
  filteredBooks: GetBookResponseModel[] = [];
  isFocused: boolean = false;
  protected userCurrentlyReading!: GetBookByUserCurrentlyReadingResponseModel[] | null;
  protected userWantToRead!: GetBookByUserResponseModel[] | null;
  protected userRead!: GetBookByUserReadResponseModel[] | null;
  protected allUserBooks!: GetAllBookByUserResponseModel[] | null;
  constructor(public dialog:MatDialog,public service:AuthentificationService,private bookService:BookService,
             private userService:LoginService,private router:Router) {
  }

  ngOnInit(): void {
    if(this.service.isLogged()) {
      this.GetUserById();
      this.getAllUserBooks();
      this.getUserWantToRead();
      this.getUserCurrentlyReading();
      this.getUserRead();
    }
    this.getBooks();

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

  private getBooks() {
    this.bookService.GetBooks().subscribe((x)=>{
      this.books=x.books;
    })
  }
  filterBooks() {
    if (this.searchString) {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchString.toLowerCase())
      );
    } else {
      this.filteredBooks = [];
    }
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 200);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-field') && !target.closest('.searchResult')) {
      this.resetSearch();
    }
  }

  resetSearch() {
    this.filteredBooks = [];
    this.searchString = '';
  }


  GetUserById() {

      this.service.getUserId(this.userId).subscribe((x) => {
        this.user = x;
      })

  }


  openUpdateDialog() {
    const dialogRef = this.dialog.open(UpdatetabComponent).afterClosed().subscribe(()=>{
    })
  }

  openLoginDialog() {
    this.dialog.open(SignInComponent).afterClosed().subscribe(()=>{
      this.userId=this.service.getAuthorizationToken()?.userCertificateId;
         this.GetUserById();
         this.router.navigate(['/fake']);

    })
  }
}
