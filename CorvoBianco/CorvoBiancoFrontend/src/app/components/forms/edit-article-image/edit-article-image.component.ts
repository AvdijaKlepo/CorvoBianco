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
import {NgOptimizedImage} from "@angular/common";
import {GetArticleResponse, GetArticleResponseModel} from "../../../service/article.model";
import {ArticleService} from "../../../service/article.service";
import {BookService} from "../../../service/book.service";
import {GetBookResponseModel, GetGenreResponseModel} from "../../../service/book.model";

@Component({
  selector: 'app-edit-article-image',
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
    NgOptimizedImage,
  ],
  templateUrl: './edit-article-image.component.html',
  styleUrl: './edit-article-image.component.css'
})
export class EditArticleImageComponent implements OnInit{
  form!: FormGroup;
  value:any;
  protected books: GetBookResponseModel[]=[];
  constructor(private fb:FormBuilder,private dialogRef:MatDialogRef<EditArticleImageComponent>,
              @Inject(MAT_DIALOG_DATA)public data:GetArticleResponseModel,private service:ArticleService,private bookService:BookService) {
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
    this.bookService.GetBooks().subscribe((x)=>{
      this.books = x.books;
    })
    }

  submit() {
    const bookIds = this.data.books.map(book => book.id);
    this.form = this.fb.group({
      id: [this.data.id],
      title: [this.data.title],
      preview: [this.data.articlePreview],
      posted: [this.data.posted],
      articleDescription: [this.data.articleDescription],
      bookIds: [bookIds],
      articleImage:this.value
    });
    console.log(this.data.articleImage)
    this.form.value.id=this.data.id;
    this.service.AddArticle(this.form.value).subscribe(()=>{
      this.closeAddArticleDialog();
    })
  }

  generate_preview() {
// @ts-ignore
    var file = document.getElementById("articleImage-input").files[0];
    if (file && this.data) {
      var reader = new FileReader();
      reader.onload = () => {
        this.value = reader.result?.toString();
        // @ts-ignore
        this.data!.articleImage = this.value;
      }
      reader.readAsDataURL(file)
    }
  }

  closeAddArticleDialog() {
    this.dialogRef.close()
  }
}
