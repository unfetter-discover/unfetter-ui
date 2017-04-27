import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { BaseStixComponent } from '../../base-stix.component';
import { SightingService } from '../sighting.service';
import { Sighting } from '../../../models';

@Component({
  selector: 'sighting-new',
  templateUrl: './sighting-new.component.html',
})
export class SightingNewComponent extends BaseStixComponent implements OnInit {

  private sighting: Sighting = new Sighting();
  private sourceTypes = ['Indicator', 'Campaign', 'Intrusion Set' ];

    constructor(
        public sightingService: SightingService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(sightingService, route, router, dialog, location);

        console.log('Initial SightingNewComponent');
    }
    public ngOnInit() {
        console.log('Initial SightingNewComponent');
    }

    public saveButtonClicked(): void {
        let subscription = super.save(this.sighting).subscribe(
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
