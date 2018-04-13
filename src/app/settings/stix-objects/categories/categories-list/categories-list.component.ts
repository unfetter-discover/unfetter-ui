import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseOfAction } from '../../../../models';
import { StixService } from '../../../stix.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent extends CategoriesComponent implements OnInit {
  public courseOfActions: CourseOfAction[];
  public url: string;

  constructor(
    public stixService: StixService,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    public location: Location,
    public snackBar: MatSnackBar) {

    super(stixService, route, router, dialog, location, snackBar);
    this.url = stixService.url;
  }

  public ngOnInit() {
    const filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.name': '1' }));
    const subscription = super.load(filter).subscribe(
      (data) => {
        this.courseOfActions = data as CourseOfAction[];
        // this.assignCopy();
      }, (error) => {
        // handle errors here
        console.log('error ' + error);
      }, () => {
        // prevent memory links
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    );
  }

  public deletButtonClicked(courseOfAction: CourseOfAction): void {
    super.openDialog(courseOfAction).subscribe(
      () => {
        this.courseOfActions = this.courseOfActions.filter((h) => h.id !== courseOfAction.id);
      }
    );
  }

}
