import { Component } from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatePipe, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {BookService} from "../../service/book.service";
import {GetSeriesResponseModel} from "../../service/book.model";

@Component({
  selector: 'app-series-overview',
  standalone: true,
  imports: [
    MatDivider,
    RouterLink,
    NgOptimizedImage,
    MatButton,
    SlicePipe,
    DatePipe,
    NgIf

  ],
  templateUrl: './series-overview.component.html',
  styleUrl: './series-overview.component.css'
})
export class SeriesOverviewComponent {
  series!: GetSeriesResponseModel;
  author:string;
  authorId:number;
  expandedDescription: boolean[]=[];



  constructor(private service:BookService, protected route:ActivatedRoute, private router:Router) {
    // @ts-ignore
    this.author=this.router.getCurrentNavigation()?.extras.state.author
    // @ts-ignore
    this.authorId=router.getCurrentNavigation()?.extras.state.authorId;

  }
  ngOnInit(): void {
    this.GetSeriesDetails();
    console.log(this.author=history.state.author);



  }






  private GetSeriesDetails() {
    this.service.GetSeriesDetails(this.route.snapshot.params['id']).subscribe((x)=>{
      this.series=x;
    })
  }

  seeMore(index:number):void {
    this.expandedDescription[index] = !this.expandedDescription[index];
  }

}
