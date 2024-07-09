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
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {BookService} from "../../../service/book.service";
import {AddBookComponent} from "../add-book/add-book.component";
import {GetBookDetailPageResponse, GetGenreResponseModel, GetSeriesResponseModel} from "../../../service/book.model";
import {AuthorService} from "../../../service/author.service";
import {GetAuthorResponseModel} from "../../../service/author.model";

@Component({
  selector: 'app-edit-book',
  standalone: true,
  providers:[provideNativeDateAdapter()],
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
    MatSelect


  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit{
  authors: GetAuthorResponseModel[]=[];
  series: GetSeriesResponseModel[]=[];
  genres: GetGenreResponseModel[]=[];
  constructor(private fb:FormBuilder,private service:BookService,
              private dialogRef:MatDialogRef<AddBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data:GetBookDetailPageResponse,
              private authorService:AuthorService,) {
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      id:this.data.id,
      title:this.data.title,
      authorId:this.data.author,
      series:this.data.series,
      genreId:this.data.genres,
      description:this.data.description,
      pageCount:this.data.pageCount,
      published:this.data.published,



    });
    console.log(this.data.authorId)

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
  form!: FormGroup;

  submit() {
    this.form.value.id=this.data.id;
    this.service.AddBook(this.form.value).subscribe(()=>{
      this.closeAddBookDialog();
    })
  }

  closeAddBookDialog() {
    this.dialogRef.close()
  }
}
