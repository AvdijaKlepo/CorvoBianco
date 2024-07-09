import { Component } from '@angular/core';
import {AddArticleComponent} from "../forms/add-article/add-article.component";
import {AddAuthorComponent} from "../forms/add-author/add-author.component";
import {AddBookComponent} from "../forms/add-book/add-book.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {LoginComponent} from "../forms/login/login.component";
import {RegisterComponent} from "../forms/register/register.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    AddArticleComponent,
    AddAuthorComponent,
    AddBookComponent,
    MatTab,
    MatTabGroup,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
