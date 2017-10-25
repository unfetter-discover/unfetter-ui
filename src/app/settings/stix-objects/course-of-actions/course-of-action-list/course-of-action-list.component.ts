import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { CourseOfActionComponent } from '../course-of-action/course-of-action.component';
import { StixService } from '../../../stix.service';
import { CourseOfAction } from '../../../../models';

@Component({
    selector: 'course-of-action-list',
    templateUrl: './course-of-action-list.component.html',
})

export class CourseOfActionListComponent extends CourseOfActionComponent implements OnInit {
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
