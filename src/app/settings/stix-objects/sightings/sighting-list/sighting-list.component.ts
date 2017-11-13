import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Sighting } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'sighting-list',
  templateUrl: './sighting-list.component.html',
})
export class SightingListComponent extends BaseStixComponent implements OnInit {
    public sightings: Sighting[] = [];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.SIGHTING_URL;
    }

    public ngOnInit() {
        const filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.name': '1' }));
        const subscription =  super.load(filter).subscribe(
            (data) => {
                this.sightings = data;
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

    public editButtonClicked(sighting: Sighting): void {
        const link = ['edit', sighting.id];
        super.gotoView(link);
    }

    public showDetails(event: any, sighting: Sighting): void {
        event.preventDefault();
        const link = ['.', sighting.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(sighting: Sighting): void {
        super.openDialog(sighting).subscribe(
            () => {
                this.filteredItems = this.filteredItems.filter((h) => h.id !== sighting.id);
            }
        );
    }
}
