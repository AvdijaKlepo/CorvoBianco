import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-fake',
  standalone: true,
  imports: [],
  templateUrl: './fake.component.html',
  styleUrl: './fake.component.css'
})
export class FakeComponent implements OnInit{
  constructor(private router:Router) {
  }
    ngOnInit(): void {
        this.router.navigate(['community'])
    }

}
