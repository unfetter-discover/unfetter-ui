import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { CourseOfAction, ExternalReference, StixObject } from '../../../models';

@Component({
  selector: 'course-of-action-new',
  templateUrl: './course-of-action-new.component.html',
})
export class CourseOfActionNewComponent extends BaseStixComponent implements OnInit {

   public courseOfAction: CourseOfAction  = new CourseOfAction();

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog);
        stixService.url = 'api/threat-actors';
    }

    public ngOnInit() {
        console.log('Initial CourseOfActionNewComponent');
    }

    public addLabelButtonClicked(): void {
        this.courseOfAction.attributes.labels.unshift('');
    }

    public removeLabelButtonClicked(label: string): void {
        this.courseOfAction.attributes.labels = this.courseOfAction.attributes.labels.filter((l) => l !== label);
    }

    public saveButtonClicked(): void {
        let subscription = super.save(this.courseOfAction).subscribe(
            (data) => {
                this.courseOfAction = data as CourseOfAction;
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
