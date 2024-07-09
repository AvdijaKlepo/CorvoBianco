import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {LoginService} from "../../../../authentification/login.service";
import {AuthentificationService} from "../../../service/authentification.service";
import {AuthenticationToken} from "../../../../authentification/authentificationToken";
import {HttpClient} from "@angular/common/http";
import { AuthLoginResponse} from "./loginresponse";
import {generateJitFileUri} from "@angular-devkit/build-angular/src/tools/esbuild/angular/uri";
import {AuthLoginRequest} from "./loginrequest";
import {SignalRService} from "../../../service/signal-r.service";
import {RegisterComponent} from "../register/register.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {identifierName} from "@angular/compiler";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public loginRequest: AuthLoginRequest = {
    password:"",
    username:"",
    signalRConnectionId:''

  };
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private authService:AuthentificationService,
    private dialogRef:MatDialogRef<LoginComponent>,
    private bar:MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    }
    openBar(message:string,action:string)
    {
      this.bar.open(message,action);
    }

  submit() {
    this.loginRequest.signalRConnectionId = SignalRService.ConnectionId;
    console.log('SignalR ConnectionId:', this.loginRequest.signalRConnectionId);
    this.service.login(this.form.value).subscribe((authenticationToken) => {
      if(!authenticationToken.isLogged)
      {
        this.bar.open('Wrong username or password.');
      }
      else {
        this.authService.setLoggedUser(authenticationToken.authenticationToken);
        this.bar.open('Login Successful!')._dismissAfter(2000);
      }
      this.closeLoginDialog();
    });

  }


  protected readonly SignalRService = SignalRService;

   closeLoginDialog() {
    this.dialogRef.close();
  }

  protected readonly identifierName = identifierName;
  protected readonly close = close;
}
