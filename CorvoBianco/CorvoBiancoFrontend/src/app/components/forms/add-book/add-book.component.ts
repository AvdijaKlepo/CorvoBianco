import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
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
import {MatDivider} from "@angular/material/divider";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {GetAuthorResponseModel} from "../../../service/author.model";
import {GetGenreResponseModel, GetSeriesResponseModel} from "../../../service/book.model";
import {BookService} from "../../../service/book.service";
import {AuthorService} from "../../../service/author.service";

@Component({
  selector: 'app-add-book',
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
    MatSelect,
    MatOption,
    MatDivider,
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit{
  form!: FormGroup;
  @Output() addAuthorClicked = new EventEmitter<void>();
  @Output() addSeriesClicked=new EventEmitter<void>();
  authors: GetAuthorResponseModel[]=[];
  series: GetSeriesResponseModel[]=[];
  genres: GetGenreResponseModel[]=[];
  constructor(private fb:FormBuilder,private dialogRef:MatDialogRef<AddBookComponent>,private service:BookService,private authorService:AuthorService) {
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      title:['',Validators.required],
      authorId:['',Validators.required],
      series:null,
      description:['',Validators.required],
      pageCount:['',Validators.pattern("[0-9]")],
      genreId:['',Validators.required],
      published:[new Date(),Validators.required],
      seriesName:['',Validators.required],
      genreName:['',Validators.required],

    });
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
    const formData = this.form.value;
    if (formData.series === null) {
      formData.series = undefined; // or you can set it to any other value that suits your backend
    }
    this.service.AddBook(formData).subscribe(() => {
      this.closeAddBookDialog();
    });
  }

  emitAddAuthorClicked() {
    this.addAuthorClicked.emit();
  }

  getData() {
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

  emitAddSeriesClicked() {
    // @ts-ignore
    document.getElementById("seriesInput").focus();
  }

  closeAddBookDialog() {
    this.dialogRef.close()
  }

  submitGenre() {
    this.service.AddGenre(this.form.value).subscribe(()=>{
      this.service.GetGenre();
    })

  }

  submitSeries() {
    this.service.AddSeries(this.form.value).subscribe(()=>{
      this.service.GetSeries();
    })
  }

  AddGenreClicked() {
    // @ts-ignore
    document.getElementById("genreInput").focus();
  }
}
