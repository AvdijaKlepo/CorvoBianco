import { Routes } from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {AuthorsComponent} from "./components/authors/authors.component";
import {AuthordetailsComponent} from "./components/authordetails/authordetails.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {ArticleDetailsComponent} from "./components/article-details/article-details.component";
import {SeriesOverviewComponent} from "./components/series-overview/series-overview.component";
import {MyBooksComponent} from "./components/my-books/my-books.component";
import {CommunityComponent} from "./components/community/community.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {AuthorizationGuardService} from "../authentification/authorization-guard.service";
import {AuthorziatonUserguardService} from "../authentification/authorziaton-userguard.service";
import {FakeComponent} from "./components/fake/fake.component";
import {ArticlesComponent} from "./components/articles/articles.component";

export const routes: Routes = [
  {
    path:'community',
    component:CommunityComponent,
    pathMatch:'full',
  },
  //Homepage startup
  {
    path:'',
    redirectTo:'community',
    pathMatch:'full'
  },
  {
    path:'authors',
    component:AuthorsComponent,
  },
  {
    path:'author-details/:id',
    component:AuthordetailsComponent,
  },
  {
    path:'book-details/:id',
    component:BookDetailsComponent,
    pathMatch:'full'
  },
  {
    path:'article-details/:id',
    component:ArticleDetailsComponent
  },
  {
    path:'series-overview/:id',
    component:SeriesOverviewComponent
  },
  {
    path:'my-books',
    component:MyBooksComponent
  },
  {
    path:'homepage',
    component:HomepageComponent,
  },
  {
    path:'user-profile/:id',
    component:UserProfileComponent,
  },
  {
    path:'orders',
    component:OrdersComponent,
    canActivate:[AuthorizationGuardService]
  },
  {
    path:'fake',
    component:FakeComponent,
  },
  {
    path:'articles',
    component:ArticlesComponent
  }
];
