import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseOfActionComponent } from '../course-of-action/course-of-action.component';
import { StixService } from '../../stix.service';
import { CourseOfAction, AttackPattern } from '../../../models';
import { Constance } from '../../../utils/constance';

@Component({
    selector: 'course-of-action-mitigate',
    templateUrl: './course-of-action-mitigate.component.html'
})
export class CourseOfActionMitigateComponent extends CourseOfActionComponent  implements OnInit {
    protected courseOfAction: CourseOfAction = new CourseOfAction();
    private source: AttackPattern[];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.COURSE_OF_ACTION_URL;
    }

    public ngOnInit() {
       let subscription =  super.get().subscribe(
            (data) => {
                this.courseOfAction = data as CourseOfAction;
                this.loadAttachPatteren();
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

    private loadAttachPatteren(): void {
        this.stixService.url = Constance.ATTACK_PATTERN_URL;
        super.load().subscribe(
            (data) => {
                this.source = data  as AttackPattern[];
            }
        );
    }
}
