import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {LoginService} from "../../../../authentification/login.service";
import {GetAuthorResponseModel} from "../../../service/author.model";
import {GetUserResponseModel} from "../../../service/authentification.model";

@Component({
  selector: 'app-edit-user-profile',
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
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css'
})
export class EditUserProfileComponent implements OnInit{
  form!: FormGroup;
  constructor(private service:LoginService,private fb:FormBuilder,
              private dialogRef:MatDialogRef<EditUserProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data:GetUserResponseModel,) {
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      id:this.data.id,
      name:this.data.name,
      lastName:this.data.lastName,
      birthDate:this.data.birthDate,
      username:this.data.username,
      password:this.data.password
    })
  }


  submit() {
    this.service.Register(this.form.value).subscribe(()=>
    this.closeEditProfileDialog()
    )
  }

  closeEditProfileDialog() {
    this.dialogRef.close();
  }
}
