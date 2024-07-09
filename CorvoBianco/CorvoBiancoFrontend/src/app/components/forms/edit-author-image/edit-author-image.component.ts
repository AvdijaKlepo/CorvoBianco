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
import {NgOptimizedImage} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {GetAuthorResponseModel} from "../../../service/author.model";
import {AuthorService} from "../../../service/author.service";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-edit-author-image',
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
    NgOptimizedImage,
  ],
  templateUrl: './edit-author-image.component.html',
  styleUrl: './edit-author-image.component.css'
})
export class EditAuthorImageComponent implements OnInit {
  constructor(private dialogRef:MatDialogRef<EditAuthorImageComponent>,
              @Inject(MAT_DIALOG_DATA) public data:GetAuthorResponseModel,private fb:FormBuilder,private service:AuthorService) {
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
  value:any;

  submit() {
    this.form=this.fb.group({
      firstName:this.data.firstName,
      lastName:this.data.lastName,
      born:this.data.born,
      bio:this.data.bio,
      id:this.data.id,
      profilePicture:this.value
    })
    this.service.AddAuthor(this.form.value).subscribe(()=>{
      this.closeAddAuthorDialog()
    })
  }

  generate_preview() {
// @ts-ignore
    var file = document.getElementById("authorImage-input").files[0];
    if (file && this.data) {
      var reader = new FileReader();
      reader.onload = () => {
        this.value = reader.result?.toString();
        // @ts-ignore
        this.data!.articleImage = this.value;
      }
      reader.readAsDataURL(file)
    }
  }

  closeAddAuthorDialog() {
    this.dialogRef.close();
  }
}
