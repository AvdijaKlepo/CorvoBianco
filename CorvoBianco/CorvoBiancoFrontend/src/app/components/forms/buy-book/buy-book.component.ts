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
import {GetBookDetailPageResponse} from "../../../service/book.model";
import {LoginService} from "../../../../authentification/login.service";
import {AuthentificationService} from "../../../service/authentification.service";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-buy-book',
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
    ReactiveFormsModule
  ],
  templateUrl: './buy-book.component.html',
  styleUrl: './buy-book.component.css'
})
export class BuyBookComponent implements OnInit{
  form!: FormGroup;
  userId=this.authService.getAuthorizationToken()?.userCertificateId;
  constructor(private dialogRef:MatDialogRef<BuyBookComponent>,
              @Inject(MAT_DIALOG_DATA) protected data:GetBookDetailPageResponse,
              private fb:FormBuilder,
              private service:LoginService,
              private authService:AuthentificationService) {
  }

  ngOnInit(): void {
        this.form=this.fb.group({
          cardholderName:'',
          cardType:'',
          last4Digits:'',
          expirationDate:'',
          cardToken:''

        })
    }


  submit() {
    this.service.BuyBook(this.userId,this.data.id,this.form.value).subscribe(()=>{
      alert("Transaction successful");
      this.closeBuyBookDialog();
    })
  }

  closeBuyBookDialog() {
    this.dialogRef.close();
  }
}
