import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {NgOptimizedImage} from "@angular/common";
import {AuthorService} from "../../service/author.service";
import {MatDialog} from "@angular/material/dialog";
import {GetAuthorResponse, GetAuthorResponseModel} from "../../service/author.model";
import {MatButton} from "@angular/material/button";
import {AuthentificationService} from "../../service/authentification.service";

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    RouterLink,
    MatDivider,
    NgOptimizedImage,
    MatButton
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit{
  authors: GetAuthorResponseModel[]=[];
  constructor(private service:AuthorService, public dialog:MatDialog,
              protected authService:AuthentificationService)  {
  }
  ngOnInit(): void {
      this.getAuthors();
  }
  private getAuthors() {
    this.service.GetAuthors().subscribe((x:GetAuthorResponse)=>{
      this.authors=x.authors;
    })
  }


  deleteAuthor(id:number) {
    this.service.DeleteAuthor(id).subscribe(()=>{
      this.getAuthors();
    })
  }

}
