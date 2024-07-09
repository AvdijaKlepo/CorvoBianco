import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {LoginService} from "../../../../authentification/login.service";

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  form!: FormGroup;
  constructor(private service:LoginService,private fb:FormBuilder,private dialogRef:MatDialogRef<RegisterComponent>) {
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      username:'',
      password:'',
      name:'',
      lastName:'',
      birthDate:''
    })

  }


  closeRegisterDialog() {
    this.dialogRef.close();
  }

  submit() {
    this.service.Register(this.form.value).subscribe(()=>{
      this.dialogRef.close();
    })
  }
}
