import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'stix';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { StixService } from '../../../stix.service';
import { CategoriesComponent } from '../categories/categories.component';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent extends CategoriesComponent implements OnInit, OnDestroy {
  public categories: Category[];
  public url: string;

  private subscriptions: Subscription[] = [];

  constructor(
    public stixService: StixService,
    public genericApiService: GenericApi,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    public location: Location,
    public snackBar: MatSnackBar) {

    super(stixService, genericApiService, route, router, dialog, location, snackBar);
    this.url = 'categories';
  }

  /**
   * @returns void
   */
  public ngOnInit(): void {
    const filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.name': '1' }));
    const sub$ = super.load(filter).subscribe(
      (data) => this.categories = data as Category[],
      (error) => console.log('error ' + error));
    this.subscriptions.push(sub$);
  }

  /**
   * @description clean up this components resources and subscriptions
   * @returns void
   */
  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions
        .filter((el) => el !== undefined)
        .forEach((subscription) => subscription.unsubscribe());
    }
  }

  /**
   * @description discard any categories with the id of the given category
   * @param  {Category} category
   * @returns void
   */
  public deletButtonClicked(category?: Category): void {
    if (!category || !category.id) {
      return;
    }

    const dialogSub$ = super.openDialog(category)
      .subscribe(
        () => {
          const hasId = (h) => h.id !== category.id;
          this.categories = this.categories.filter(hasId);
          this.filteredItems = this.filteredItems.filter(hasId);
        }
      );
    this.subscriptions.push(dialogSub$);
  }

}
