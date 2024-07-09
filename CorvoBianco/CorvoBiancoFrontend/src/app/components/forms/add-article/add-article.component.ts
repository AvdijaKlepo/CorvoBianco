import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {GetBookResponseModel, GetGenreResponseModel} from "../../../service/book.model";
import {ArticleService} from "../../../service/article.service";
import {BookService} from "../../../service/book.service";
import {AuthInterceptorService} from "../../../../authentification/auth-interceptor.service";
import {AuthorizationGuardService} from "../../../../authentification/authorization-guard.service";

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatHint,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.css'
})
export class AddArticleComponent implements OnInit{

  form!: FormGroup;
  genre: GetGenreResponseModel[]=[];
  protected books: GetBookResponseModel[]=[];
  constructor(private fb:FormBuilder,private dialog:MatDialogRef<AddArticleComponent>,private service:ArticleService,private bookService:BookService,
              private guard:AuthorizationGuardService) {
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      title: '',
      preview: '',
      posted: new Date(),
      articleDescription: '',
      bookIds:[]
    });
    this.bookService.GetBooks().subscribe(x=>{
      this.books=x.books
    })

  }
  submit() {

    this.service.AddArticle(this.form.value).subscribe(()=>{
      this.closeAddArticleDialog();
    })
  }

  closeAddArticleDialog() {
    this.dialog.close();
  }
}
