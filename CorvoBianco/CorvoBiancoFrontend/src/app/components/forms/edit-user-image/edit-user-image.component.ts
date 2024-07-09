import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {LoginService} from "../../../../authentification/login.service";
import {GetUserResponseModel} from "../../../service/authentification.model";
import {NgOptimizedImage} from "@angular/common";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-edit-user-image',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './edit-user-image.component.html',
  styleUrl: './edit-user-image.component.css'
})
export class EditUserImageComponent implements OnInit{
  form!: FormGroup;
  value:any;
  constructor(private service:LoginService,
              private dialogRef:MatDialogRef<EditUserImageComponent>,
              @Inject(MAT_DIALOG_DATA) protected data:GetUserResponseModel,
              private fb:FormBuilder) {
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
    this.form=this.fb.group({
      id:this.data.id,
      name:this.data.name,
      lastName:this.data.lastName,
      birthDate:this.data.birthDate,
      username:this.data.username,
      password:this.data.password,
      profileImage:this.value
    })
    this.service.Register(this.form.value).subscribe(()=>{
      this.closeEditProfileImageDialog()
    })
  }

  closeEditProfileImageDialog() {
    this.dialogRef.close()
  }

  generate_preview() {
// @ts-ignore
    var file = document.getElementById("userImage-input").files[0];
    if (file && this.data) {
      var reader = new FileReader();
      reader.onload = () => {
        this.value = reader.result?.toString();
        // @ts-ignore
        this.data!.profileImage = this.value;
      }
      reader.readAsDataURL(file)
    }
  }
}
