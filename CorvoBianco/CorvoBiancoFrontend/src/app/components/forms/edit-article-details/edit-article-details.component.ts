import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {ArticleService} from "../../../service/article.service";
import {GetArticleResponseModel} from "../../../service/article.model";
import {BookService} from "../../../service/book.service";
import {GetBookResponseModel, GetGenreResponseModel} from "../../../service/book.model";

@Component({
  selector: 'app-edit-article-details',
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
  templateUrl: './edit-article-details.component.html',
  styleUrl: './edit-article-details.component.css'
})
export class EditArticleDetailsComponent implements OnInit{
  form!: FormGroup;

  protected books: GetBookResponseModel[]=[];
  constructor(private fb:FormBuilder,private service:ArticleService,private dialogRef:MatDialogRef<EditArticleDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data:GetArticleResponseModel,private bookService:BookService) {
  }

  ngOnInit(): void {
    const bookIds = this.data.books.map(book => book.id);

    this.form = this.fb.group({
      id: [this.data.id],
      title: [this.data.title],
      preview: [this.data.articlePreview],
      posted: [this.data.posted],
      articleDescription: [this.data.articleDescription],
      bookIds: [bookIds]
    });

    this.bookService.GetBooks().subscribe(x => {
      this.books = x.books;
    });
    }

  submit() {
    this.service.AddArticle(this.form.value).subscribe(()=>{
      this.closeAddArticleDialog();
    })
  }

  closeAddArticleDialog() {
    this.dialogRef.close()
  }
}
