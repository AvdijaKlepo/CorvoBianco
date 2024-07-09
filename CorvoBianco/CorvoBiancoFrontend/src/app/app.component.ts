import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {TokenRefreshService} from "./service/token-refresh.service";
import {AuthentificationService} from "./service/authentification.service";
import {interval, Subscription, takeWhile} from "rxjs";
import {SignalRService} from "./service/signal-r.service";
import {FooterComponent} from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'CorvoBiancoFrontend';
  private refreshSubscription: Subscription |undefined = undefined;
  constructor(private tokenRefreshService:TokenRefreshService,private service:AuthentificationService,
              private signalRService:SignalRService) {
  }
  ngOnInit(): void {
    this.signalRService.startConnection();


    const oldToken = this.service.getAuthorizationToken()?.value;
    if (oldToken) {
      this.refreshSubscription = interval(45 * 60 * 1000)
        .pipe(
          takeWhile(() => this.service.isLogged())
        )
        .subscribe(() => {
          this.tokenRefreshService.refreshAuthToken(oldToken).subscribe();
        });
    }}
  ngOnDestroy(): void {
    if (this.refreshSubscription){
    this.refreshSubscription.unsubscribe();}

  }

}
