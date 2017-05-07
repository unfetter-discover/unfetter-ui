import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Sighting } from '../../../models';

@Component({
  selector: 'sighting-new',
  templateUrl: './sighting-new.component.html',
})
export class SightingNewComponent extends BaseStixComponent {

  private sighting: Sighting = new Sighting();
  private sourceTypes = ['Indicator', 'Campaign', 'Intrusion Set' ];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
        stixService.url = 'cti-stix-store-api/sightings';
    }

    public saveButtonClicked(): void {
        let subscription = super.create(this.sighting).subscribe(
            (data) => {
                this.sighting = data as Sighting;
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
