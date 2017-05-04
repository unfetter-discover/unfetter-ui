import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseOfActionComponent } from '../course-of-action/course-of-action.component';
import { Location } from '@angular/common';
import { StixService } from '../../stix.service';
import { CourseOfAction } from '../../../models';

@Component({
  selector: 'course-of-action-list',
  templateUrl: './course-of-action-list.component.html',
})

export class CourseOfActionListComponent extends CourseOfActionComponent implements OnInit {
    private courseOfActions: CourseOfAction[] = [];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
    }

    public ngOnInit() {
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
