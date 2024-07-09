import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {BookService} from "../../../service/book.service";

@Component({
  selector: 'app-add-genre',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './add-genre.component.html',
  styleUrl: './add-genre.component.css'
})
export class AddGenreComponent implements OnInit{
  constructor(private fb:FormBuilder,private dialogRef:MatDialogRef<AddGenreComponent>,private service:BookService) {
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      genreName:''
    });
  }
  form!: FormGroup;

  submit() {
    this.service.AddGenre(this.form.value).subscribe(()=>{
      this.dialogRef.close()
    })
  }

  closeAddGenreDialog() {
    this.dialogRef.close();
  }
}
