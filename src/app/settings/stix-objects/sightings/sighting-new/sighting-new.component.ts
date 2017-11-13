import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar } from '@angular/material';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Sighting } from '../../../../models';

@Component({
  selector: 'sighting-new',
  templateUrl: './sighting-new.component.html',
})
export class SightingNewComponent extends BaseStixComponent {

  public sighting = new Sighting();
  public sourceTypes = [{label: 'Indicator', value: 'indicator'}, {label: 'Campaign', value: 'Campaign'}, {label: 'Intrusion Set', value: 'Intrusion Set'} ];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = this.sighting.url;
    }

    public saveButtonClicked(): void {
        if (!this.sighting.attributes.sighting_of_ref) {
            return;
        }
        const subscription = super.create(this.sighting).subscribe(
            (data) => {
                // this.sighting = data as Sighting;
                const attr: any = this.sighting.attributes;
                attr.name = attr.name || this.sighting.type;
                this.location.back();
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

    public summaryClicked(field: any): void {
       this.sighting.attributes.summary = !field.checked;
    }
}
