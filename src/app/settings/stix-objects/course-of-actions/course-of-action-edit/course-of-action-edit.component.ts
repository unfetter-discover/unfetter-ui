import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { CourseOfActionComponent } from '../course-of-action/course-of-action.component';
import { StixService } from '../../../stix.service';
import { CourseOfAction, ExternalReference, Label } from '../../../../models';

@Component({
  selector: 'course-of-action-edit',
  templateUrl: './course-of-action-edit.component.html'
})
export class CourseOfActionEditComponent extends CourseOfActionComponent implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
        super.loadCourseOfAction();
    }

    protected addLabelButtonClicked(): void {
        // this.courseOfAction.attributes.label.unshift(new Label());
    }

    protected removeLabelButtonClicked(label: Label): void {
        // this.courseOfAction.attributes.label = this.courseOfAction.attributes.label.filter((l) => l.name !== label.name);
    }

    protected saveCourceOfAction(): void {
       let subscription = super.saveButtonClicked().subscribe(
            (stixObject) => {
                console.log('saved');
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
