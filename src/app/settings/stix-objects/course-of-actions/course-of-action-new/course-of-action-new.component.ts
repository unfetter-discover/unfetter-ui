import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar } from '@angular/material';
import { CourseOfActionEditComponent } from '../course-of-action-edit/course-of-action-edit.component';
import { StixService } from '../../../stix.service';
import { CourseOfAction, ExternalReference } from '../../../../models';

@Component({
  selector: 'course-of-action-new',
  templateUrl: './course-of-action-new.component.html',
})

export class CourseOfActionNewComponent extends CourseOfActionEditComponent implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
        this.courseOfAction  = new CourseOfAction();
    }

    public saveCourseOfAction(): void {
       let subscription = super.create(this.courseOfAction).subscribe(
            (stixObject) => {
                this.location.back();
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
}
