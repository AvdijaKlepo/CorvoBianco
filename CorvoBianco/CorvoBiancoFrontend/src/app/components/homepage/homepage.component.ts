import { Component } from '@angular/core';
import {BooksComponent} from "./books/books.component";
import {ArticleComponent} from "./article/article.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BooksComponent,
    ArticleComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
