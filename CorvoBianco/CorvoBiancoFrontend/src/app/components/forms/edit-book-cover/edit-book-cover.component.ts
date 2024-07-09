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
import {NgOptimizedImage} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {GetBookDetailPageResponse, GetGenreResponseModel, GetSeriesResponseModel} from "../../../service/book.model";
import {BookService} from "../../../service/book.service";
import {AuthorService} from "../../../service/author.service";
import {GetAuthorResponseModel} from "../../../service/author.model";

@Component({
  selector: 'app-edit-book-cover',
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
    MatOption,
    MatSelect,
    NgOptimizedImage
  ],
  templateUrl: './edit-book-cover.component.html',
  styleUrl: './edit-book-cover.component.css'
})
export class EditBookCoverComponent implements OnInit{
  form!: FormGroup;
  authors: GetAuthorResponseModel[]=[];
  series: GetSeriesResponseModel[]=[];
  genres: GetGenreResponseModel[]=[];
  value:any;
  constructor(private fb:FormBuilder,public dialogRef:MatDialogRef<EditBookCoverComponent>,
              @Inject(MAT_DIALOG_DATA) public data:GetBookDetailPageResponse,
              private service:BookService,private authorService:AuthorService) {
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      bookCover:this.value,
      id:this.data.id,
      title:this.data.title,
      authorId:this.data.author,
      series:this.data.series,
      genreId:this.data.genres,
      description:this.data.description,
      pageCount:this.data.pageCount,
      published:this.data.published,
    })
    this.authorService.GetAuthors().subscribe((x)=>{
      this.authors = x.authors;
    })
    this.service.GetSeries().subscribe((x)=>{
      this.series = x.series;
    })
    this.service.GetGenre().subscribe((x)=>{
      this.genres = x.genres;
    })
  }


  submit() {
    this.form=this.fb.group({
      bookCover:this.value,
      id:this.data.id,
      title:this.data.title,
      authorId:this.data.authorId,
      series:this.data.seriesId,
      genreId:this.data.genresId,


      description:this.data.description,
      pageCount:this.data.pageCount,
      published:this.data.published,
    })
    this.form.value.id=this.data.id;
    this.service.AddBook(this.form.value).subscribe(()=>{
      this.closeAddBookDialog();
    })
  }

  generate_preview() {
    // @ts-ignore
    var file = document.getElementById("bookCover-input").files[0];
    if (file && this.data) {
      var reader = new FileReader();
      reader.onload = () => {
        this.value = reader.result?.toString();
        // @ts-ignore
        this.data!.bookCover = this.value;
      }
      reader.readAsDataURL(file)
    }

  }

   closeAddBookDialog() {
    this.dialogRef.close();
  }
}
