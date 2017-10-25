import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar } from '@angular/material';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Sighting } from '../../../../models';

@Component({
  selector: 'sighting-edit',
  templateUrl: './sighting-edit.component.html',
})
export class SightingEditComponent extends BaseStixComponent implements OnInit {

  public sighting: Sighting = new Sighting();
  public sourceTypes = ['Indicator', 'Campaign', 'Intrusion Set' ];

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
    public ngOnInit() {
        let sub = super.get().subscribe(
            (data) => {
                this.sighting =  new Sighting(data);
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

    public saveButtonClicked(): void {
        if (!this.sighting.attributes.sighting_of_ref) {
            return;
        }
        let sub = super.save(this.sighting).subscribe(
            (data) => {
                this.sighting = data as Sighting;
                this.location.back();
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

    public summaryClicked(field: any): void {
      this.sighting.attributes.summary = !field.checked;
    }
}
