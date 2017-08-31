import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { IntrusionSetEditComponent } from '../intrusion-set-edit/intrusion-set-edit.component';
import { StixService } from '../../../stix.service';
import { IntrusionSet } from '../../../../models';
import { Motivation } from '../../../../models/motivation.enum';
import { ResourceLevel } from '../../../../models/resource-level.enum';
import { SortHelper } from '../../../../+assessments/assessments-summary/sort-helper';

@Component({
    selector: 'intrusion-set-new',
    templateUrl: './intrusion-set-new.component.html',
    styleUrls: ['./intrusion-set-new.component.css']
})
export class IntrusionSetNewComponent extends IntrusionSetEditComponent implements OnInit {

    public motivations = new Set(Motivation.values().map((el) => el.toString()).sort(SortHelper.sortDesc()));
    public resourceLevels = new Set(ResourceLevel.values().map((el) => el.toString()).sort(SortHelper.sortDesc()));

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
        // empty
    }

    public saveIdentity(): void {
        const sub = super.create(this.intrusionSet).subscribe(
            (data) => {
                console.log('saved');
            }, (error) => {
                // handle errors here
                console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (sub) {
                    sub.unsubscribe();
                }
            }
        );
    }
}
