import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { CourseOfAction } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
    selector: 'course-of-action',
    templateUrl: './course-of-action.component.html'
})
export class CourseOfActionComponent extends BaseStixComponent implements OnInit {
    protected courseOfAction = new CourseOfAction();
    private showLabels = true;
    private showExternalReferences = true;

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

        this.loadCourseOfAction();
    }

    public editButtonClicked(): void {
        let link = ['../edit', this.courseOfAction.id];
        super.gotoView(link);
    }

    public mitigateButtonClicked(): void {
        let link = ['../../mitigates', this.courseOfAction.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.courseOfAction).subscribe(
            () => {
                this.location.back();
            }
        );
    }

    protected saveButtonClicked(): Observable<any> {
        return Observable.create((observer) => {
               let subscription = super.save(this.courseOfAction).subscribe(
                    (data) => {
                        observer.next(data);
                        observer.complete();
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
        });
    }

    protected loadCourseOfAction(): void {
        let subscription =  super.get().subscribe(
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
