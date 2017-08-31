import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Sighting } from '../../../../models';

@Component({
  selector: 'sighting-new',
  templateUrl: './sighting-new.component.html',
})
export class SightingNewComponent extends BaseStixComponent {

  public sighting: Sighting = new Sighting();
  public sourceTypes = [{label: 'Indicator', value: 'indicator'}, {label: 'Campaign', value: 'Campaign'}, {label: 'Intrusion Set', value: 'Intrusion Set'} ];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = this.sighting.url;
    }

    public saveButtonClicked(): void {
        if (!this.sighting.attributes.sighting_of_ref) {
            return;
        }
        let subscription = super.create(this.sighting).subscribe(
            (data) => {
                // this.sighting = data as Sighting;
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
}
