import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { CourseOfAction } from '../../../models';

@Component({
  selector: 'course-of-action-list',
  templateUrl: './course-of-action-list.component.html',
})
export class CourseOfActionListComponent extends BaseStixComponent implements OnInit {
    private courseOfActions: CourseOfAction[] = [];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog) {

        super(stixService, route, router, dialog);

        console.log('Initial CourseOfActionListComponent');
        stixService.url = 'cti-stix-store-api/course-of-actions';
    }

    public ngOnInit() {
        console.log('Initial CourseOfActionListComponent');
        let subscription =  super.load().subscribe(
            (data) => {
                this.courseOfActions = data as CourseOfAction[];
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
