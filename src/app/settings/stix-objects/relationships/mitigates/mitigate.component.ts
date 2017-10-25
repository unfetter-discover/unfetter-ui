import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { CourseOfAction, AttackPattern } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
    selector: 'mitigate',
    templateUrl: './mitigate.component.html'
})
export class MitigateComponent extends BaseStixComponent  implements OnInit {
    public target: any;
    public title: string;
    public description: string;
    public source: AttackPattern[];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.COURSE_OF_ACTION_URL;
    }

    public ngOnInit() {
        this.title = 'Mapping Course of Action to Attack Patterns';
        this.description = 'This page allows your to quickly create relationships between a Course of Action and an Attack Pattern that it mitigates. Every selected checkbox is a relationship.';
        let subscription =  super.get().subscribe(
            (data) => {
                this.target = data as CourseOfAction;
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

    public loadAttachPatteren(): void {
        this.stixService.url = Constance.ATTACK_PATTERN_URL;
        super.load().subscribe(
            (data) => {
                this.source = data  as AttackPattern[];
            }
        );
    }
}
