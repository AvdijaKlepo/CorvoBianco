import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {AuthInterceptorService} from "../authentification/auth-interceptor.service";
import {AuthorizationGuardService} from "../authentification/authorization-guard.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient() ,provideAnimationsAsync(),
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi: true},
    AuthorizationGuardService]
};
