import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
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
    public intrusionSets: IntrusionSet[] = [];
    public showLabels = false;
    public showExternalReferences = false;
    public url: string;
    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        this.url = stixService.url;

    }

    public ngOnInit() {
        let filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.name': '1' }));
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
                 this.filteredItems = this.filteredItems.filter((h) => h.id !== intrusionSet.id);
            }
        );
    }
}
