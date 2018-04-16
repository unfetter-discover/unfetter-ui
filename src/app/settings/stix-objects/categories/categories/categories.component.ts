import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
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
      () => sub$.unsubscribe());
  }

  public saveButtonClicked(): Observable<Category> {
    return Observable.create((observer) => {
      let subscription = super.save(this.category).subscribe(
        (data) => {
          observer.next(data);
          observer.complete();
        },
        (error) => console.log('error ' + error),
        () => {
          // prevent memory links
          if (subscription) {
            subscription.unsubscribe();
          }
        }
      );
    });
  }

  /**
   * @description load the current category by id in the url
   * @returns void
   */
  public loadCategory(): void {
    let sub$ = super.get()
      .map((el) => el.attributes || el)
      .subscribe(
        (data) => this.category = data as Category,
        (error) => console.log('error ' + error),
        () => {
          if (sub$) {
            sub$.unsubscribe();
          }
        }
      );
  }

  public formatText(inputString): string {
    return FormatHelpers.formatAll(inputString);
  }

}
