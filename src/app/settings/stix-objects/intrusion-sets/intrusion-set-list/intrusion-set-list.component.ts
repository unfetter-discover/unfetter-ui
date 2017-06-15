import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { StixService } from '../../../stix.service';
import { IntrusionSet } from '../../../../models';

@Component({
  selector: 'intrusion-set-list',
  templateUrl: './intrusion-set-list.component.html',
})
export class IntrusionSetListComponent extends IntrusionSetComponent implements OnInit {
    private intrusionSets: IntrusionSet[] = [];
    private showLabels = false;
    private showExternalReferences = false;

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
        let filter = 'filter[order]=name';
        let subscription =  super.load(filter).subscribe(
            (data) => {
                this.intrusionSets = data as IntrusionSet[];
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

    public deletButtonClicked(intrusionSet: IntrusionSet): void {
        super.openDialog(intrusionSet).subscribe(
            () => {
                 this.intrusionSets = this.intrusionSets.filter((h) => h.id !== intrusionSet.id);
            }
        );
    }
}
