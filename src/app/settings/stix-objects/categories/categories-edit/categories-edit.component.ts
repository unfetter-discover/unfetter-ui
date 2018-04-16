import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { StixService } from '../../../stix.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent extends CategoriesComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  constructor(
    public stixService: StixService,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    public location: Location,
    public snackBar: MatSnackBar) {

    super(stixService, route, router, dialog, location, snackBar);
  }

  /**
   * @returns void
   */
  public ngOnInit(): void {
    this.loadCategory();
  }

  /**
   * @returns void
   */
  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions
        .filter((el) => el !== undefined)
        .forEach((sub) => sub.unsubscribe());
    }
  }

}
