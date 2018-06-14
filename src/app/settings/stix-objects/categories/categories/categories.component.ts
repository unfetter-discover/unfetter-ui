
import {empty as observableEmpty,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'stix';
import { GenericApi } from '../../../../core/services/genericapi.service';
import { FormatHelpers } from '../../../../global/static/format-helpers';
import { Constance } from '../../../../utils/constance';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseStixComponent<Category> implements OnInit {

  public category = new Category();
  public showLabels = true;
  public showExternalReferences = true;

  constructor(
    public stixService: StixService,
    public genericApiService: GenericApi,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    public location: Location,
    public snackBar: MatSnackBar) {

    super(stixService, route, router, dialog, location, snackBar);
    stixService.url = Constance.X_UNFETTER_CATEGORY_URL;
  }

  /**
   * @returns void
   */
  public ngOnInit(): void {
    let sub$ = this.loadCategory()
      .subscribe(
        (data: Category) => this.category = data as Category,
        (error) => console.log('error ' + error),
        () => this.closeSubscription(sub$));
  }

  public getChipInfo(chipInfo): void {
    this.selectedExternal = chipInfo;
  }
  public editButtonClicked(): void {
    let link = ['../edit', this.category.id];
    super.gotoView(link);
  }

  public mitigateButtonClicked(): void {
    let link = ['../../mitigates', this.category.id];
    super.gotoView(link);
  }

  public deleteButtonClicked(): void {
    const sub$ = super.openDialog(this.category).subscribe(
      () => this.location.back(),
      (err) => console.log(err),
      () => this.closeSubscription(sub$));
  }

  /**
   * @description call back for save button click
   * @returns Observable<Category>
   */
  public saveButtonClicked(): void {
    let o$: Observable<Category>;
    if (this.category.id) {
      o$ = this.update(this.category);
    } else {
      o$ = this.create(this.category);
    }
    const subscription = o$
      .subscribe(
        (data) => {
          const name = Array.isArray(data) && data.length > 0 ? data[0].name : data.name;
          this.snackBar.open(name + ' has been successfully saved', '', {
            duration: this.duration,
            extraClasses: ['snack-bar-background-success']
          });
          this.location.back();
        },
        (error) => console.log('error ' + error),
        () => this.closeSubscription(subscription));
  }

  /**
   * @description load the current category by id in the url
   * @returns void
   */
  public loadCategory(): Observable<Category> {
    return super.get().pipe(
      map((el: any) => this.unwrapJsonData(el)),
      map(el => this.category = el),);
  }

  public formatText(inputString): string {
    return FormatHelpers.formatAll(inputString);
  }

  /**
   * @param  {Category} category
   * @returns Observable
   */
  public create(category: Category): Observable<Category> {
    if (!category) {
      return observableEmpty();
    }
    const url = Constance.X_UNFETTER_CATEGORY_URL;
    return this.genericApiService
      .post(url, this.jsonDataWrapper(category)).pipe(
      map((el: any) => this.unwrapJsonData(el)));
  }

  /**
   * @param  {Category} category
   * @returns Observable
   */
  public update(category: Category): Observable<Category> {
    if (!category) {
      return observableEmpty();
    }
    const url = `${Constance.X_UNFETTER_CATEGORY_URL}/${category.id}`;
    return this.genericApiService
      .patch(url, this.jsonDataWrapper(category)).pipe(
      map((el: any) => this.unwrapJsonData(el)));
  }

  /**
   * @description rest api expect a jsondata api wrapper
   * @param  {Category} category
   * @returns Category
   */
  public jsonDataWrapper(category: Category): { data: { attributes: Category } } {
    return {
      data: {
        attributes: category,
      }
    }
  }

  /**
   * @description unwrapp attributes for this Category object
   * @param  {any} el - can be an array or single element
   * @returns Category
   */
  public unwrapJsonData(el: any): Category {
    if (!el) {
      return el;
    }

    if (Array.isArray(el)) {
      el = el.map((x) => this.unwrapJsonData(x));
    } else {
      el = el.attributes || el;
    }
    return el;
  }

}
