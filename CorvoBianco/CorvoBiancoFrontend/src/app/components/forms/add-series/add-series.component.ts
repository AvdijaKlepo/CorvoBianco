import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {BookService} from "../../../service/book.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {GetAuthorResponseModel} from "../../../service/author.model";
import {AuthorService} from "../../../service/author.service";

@Component({
  selector: 'app-add-series',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './add-series.component.html',
  styleUrl: './add-series.component.css'
})
export class AddSeriesComponent implements OnInit{
  constructor(private fb:FormBuilder,private dialog:MatDialogRef<AddSeriesComponent>,private service:BookService,private authorService:AuthorService) {
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      seriesName:'',
      authorId:''
    });
     this.authorService.GetAuthors().subscribe((x)=>{
      this.authors=x.authors;
     })
  }
  form!: FormGroup;
  authors: GetAuthorResponseModel[]=[];

  submit() {
    this.service.AddSeries(this.form.value).subscribe(()=>{
      this.dialog.close();
    })
  }

  closeAddSeriesDialog() {
    this.dialog.close();
  }
}
