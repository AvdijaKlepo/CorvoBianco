import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {AuthentificationService} from "../app/service/authentification.service";

// noinspection JSDeprecatedSymbols
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardService implements CanActivate {

  constructor(private router:Router,private authentificationService:AuthentificationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authentificationService.isLogged()) {
      let isAdmin = this.authentificationService.isAdmin();
      if (!isAdmin) {
        this.router.navigate(['/error404']);
        return false;
      }

      return true;
    }


    this.router.navigate(['/error404'], {queryParams: {povratniUrl: state.url}});
    return false;
  }

}
