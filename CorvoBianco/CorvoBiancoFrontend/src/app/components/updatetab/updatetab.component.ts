import {Component, Input, ViewChild} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AddAuthorComponent} from "../forms/add-author/add-author.component";
import {AddBookComponent} from "../forms/add-book/add-book.component";
import {AddGenreComponent} from "../forms/add-genre/add-genre.component";
import {AddSeriesComponent} from "../forms/add-series/add-series.component";
import {AddArticleComponent} from "../forms/add-article/add-article.component";
import {AuthorizationGuardService} from "../../../authentification/authorization-guard.service";

@Component({
  selector: 'app-updatetab',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    AddAuthorComponent,
    AddBookComponent,
    AddGenreComponent,
    AddSeriesComponent,
    AddArticleComponent
  ],
  templateUrl: './updatetab.component.html',
  styleUrl: './updatetab.component.css'
})
export class UpdatetabComponent {


  // @ts-ignore
  @ViewChild(MatTabGroup) tabGroup:MatTabGroup;
  @Input() addAuthorClicked: any;
  constructor() {
  }

  switchToAddAuthorsTab() {
    this.tabGroup.selectedIndex=1;
  }

  focusSeries() {

  }

  protected readonly AuthorizationGuardService = AuthorizationGuardService;
}
