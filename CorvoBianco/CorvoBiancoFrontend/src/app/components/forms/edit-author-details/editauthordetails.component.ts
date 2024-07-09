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
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {GetAuthorResponseModel} from "../../../service/author.model";
import {AuthorService} from "../../../service/author.service";

@Component({
  selector: 'app-edit-author-details',
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
  templateUrl: './editauthordetails.component.html',
  styleUrl: './editauthordetails.component.css'
})
export class EditauthordetailsComponent implements OnInit{
  constructor(private fb:FormBuilder,
              public dialogRef:MatDialogRef<EditauthordetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data:GetAuthorResponseModel,
              private service:AuthorService) {
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      firstName:this.data.firstName,
      lastName:this.data.lastName,
      born:this.data.born,
      bio:this.data.bio,
      id:this.data.id
    })
  }
  form!: FormGroup;

  submit() {
    this.service.AddAuthor(this.form.value).subscribe(()=>{
      this.closeAddAuthorDialog();
    })
  }

  closeAddAuthorDialog() {
    this.dialogRef.close();
  }
}
