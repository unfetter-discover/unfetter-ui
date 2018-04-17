import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'stix';
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
    this.loadCategory();
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
    const subscription = super.save(this.category)
      .subscribe(
        (data) => {
          console.log('saved', data);
        },
        (error) => console.log('error ' + error),
        () => this.closeSubscription(subscription));
  }

  /**
   * @description load the current category by id in the url
   * @returns void
   */
  public loadCategory(): void {
    let sub$ = super.get()
      .map((el: any) => el.attributes || el)
      .subscribe(
        (data: Category) => this.category = data as Category,
        (error) => console.log('error ' + error),
        () => this.closeSubscription(sub$));
  }

  public formatText(inputString): string {
    return FormatHelpers.formatAll(inputString);
  }

}
