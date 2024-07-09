import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {GetBookDetailPageResponse} from "../../../service/book.model";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {AuthentificationService} from "../../../service/authentification.service";

@Component({
  selector: 'app-add-review',
  standalone: true,
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
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent implements OnInit{
  form!: FormGroup;
  userId:number | undefined=this.service.getAuthorizationToken()?.userCertificateId;
  currentRating: number = 0;
  stars: boolean[] = [false, false, false, false, false];
  constructor(private dialogRef: MatDialogRef<AddReviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data:GetBookDetailPageResponse,
              private service:AuthentificationService,private fb:FormBuilder)  {
  }
    ngOnInit(): void {
      this.form=this.fb.group({
        review:''
      });

      this.getUserRating();


    }
  private getUserRating(): void {
    if (this.userId && this.data && this.data.id) {
      this.service.getUserRating(this.data.id, this.userId).subscribe({
        next: (rating) => {
          this.currentRating = rating;
          this.updateStars(rating)
        },
        error: (err) => {
          console.error('Failed to get user rating', err);
        }
      });
    }
  }
  private updateStars(rating: number): void {
    this.stars = this.stars.map((_, index) => index < rating);
  }



  submit() {
    const reviewRequest = { review: this.form.value.review };
    this.service.submitReview(this.data.id, this.userId, reviewRequest).subscribe(() => {
      this.dialogRef.close();
    }, error => {
      console.error('Failed to submit review', error);
    });
  }

  closeAddBookDialog() {
    this.dialogRef.close()
  }

  protected readonly location = location;
}
