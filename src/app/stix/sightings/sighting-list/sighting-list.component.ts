import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Sighting } from '../../../models';

@Component({
  selector: 'sighting-list',
  templateUrl: './sighting-list.component.html',
})
export class SightingListComponent extends BaseStixComponent implements OnInit {
    private sightings: Sighting[] = [];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog) {

        super(stixService, route, router, dialog);
        stixService.url = 'cti-stix-store-api/sightings';
        console.log('Initial SightingListComponent');
    }

    public ngOnInit() {
        console.log('Initial SightingListComponent');
        let subscription =  super.load().subscribe(
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
        let link = ['edit', sighting.id];
        super.gotoView(link);
    }

    public showDetails(event: any, sighting: Sighting): void {
        event.preventDefault();
        let link = ['.', sighting.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(sighting: Sighting): void {
        super.openDialog(sighting);
    }
}
