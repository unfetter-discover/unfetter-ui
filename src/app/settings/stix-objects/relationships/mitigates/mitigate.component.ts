import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
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
    protected target: any;
    protected title: string;
    protected description: string;
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

    protected loadAttachPatteren(): void {
        this.stixService.url = Constance.ATTACK_PATTERN_URL;
        super.load().subscribe(
            (data) => {
                this.source = data  as AttackPattern[];
            }
        );
    }
}
