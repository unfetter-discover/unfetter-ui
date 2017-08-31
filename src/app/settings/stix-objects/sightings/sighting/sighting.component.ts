import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Sighting } from '../../../../models';

@Component({
  selector: 'sighting',
  templateUrl: './sighting.component.html',
})
export class SightingComponent extends BaseStixComponent implements OnInit {

  public sighting: Sighting = new Sighting();
  public sourceTypes = ['Indicator', 'Campaign', 'Intrusion Set' ];

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
    public ngOnInit() {
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
