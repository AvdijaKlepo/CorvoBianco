import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {AuthorService} from "../../../service/author.service";

@Component({
  selector: 'app-add-author',
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
  ],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb:FormBuilder,private service:AuthorService,private dialogRef:MatDialogRef<AddAuthorComponent>) {
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      firstName:'',
      lastName:'',
      born:'',
      bio:''
    });
    }

  submit() {
    this.service.AddAuthor(this.form.value).subscribe(()=>{
      this.form.reset();
    })
  }

  closeAddAuthorDialog() {
    this.dialogRef.close();
  }
}
