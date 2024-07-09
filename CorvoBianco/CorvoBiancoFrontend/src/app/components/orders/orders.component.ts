import {Component, OnInit} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {NgOptimizedImage} from "@angular/common";
import {AuthentificationService} from "../../service/authentification.service";
import {GetPurchasesResponse} from "../../service/authentification.model";
import {SignalRService} from "../../service/signal-r.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatDivider,
    NgOptimizedImage,
    MatButton
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  protected orders: GetPurchasesResponse[] = [];
  orderClicked:boolean = false;

  constructor(
    private service: AuthentificationService,
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    this.getPurchases();
  }

  private getPurchases() {
    this.service.getOrders().subscribe((x) => {
      this.orders = x;
    });
  }

  shipOrder(orderId: number) {
    this.service.shipOrder(orderId).subscribe({
      next: () => {
        console.log(`Order ${orderId} has been shipped.`);
        this.getPurchases();
      },
      error: (err) => {
        console.error(`Failed to ship order ${orderId}: ${err}`);
      }
    });
  }

}
