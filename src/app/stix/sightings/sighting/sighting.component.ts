import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Sighting } from '../../../models';

@Component({
  selector: 'sighting',
  templateUrl: './sighting.component.html',
})
export class SightingComponent extends BaseStixComponent implements OnInit {

  private sighting: Sighting = new Sighting();
  private sourceTypes = ['Indicator', 'Campaign', 'Intrusion Set' ];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
        stixService.url = 'api/sightings';
        console.log('Initial SightingComponent');
    }
    public ngOnInit() {
        console.log('Initial SightingComponent');
        let sub = super.get().subscribe(
            (data) => {
                this.sighting = data as Sighting;
            }, (err) => {
                 // handle errors here
                 console.log('error ' + err);
            }, () => {
               if (sub) {
                    sub.unsubscribe();
                }
            }
        );
    }

    public editButtonClicked(): void {
        let link = ['../edit', this.sighting.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.sighting);
    }
}
