import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ThreatActorsComponent } from '../threat-actor/threat-actors.component';
import { StixService } from '../../../stix.service';
import { ThreatActor } from '../../../../models';

@Component({
  selector: 'threat-actor-list',
  templateUrl: './threat-actor-list.component.html',
})
export class ThreatActorListComponent extends ThreatActorsComponent implements OnInit {
    public threatActors: ThreatActor[] = [];
    public url: string;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        this.url = stixService.url;
    }

    public ngOnInit() {
        const filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.name': '1' }));
        const subscription =  super.load(filter).subscribe(
            (data) => {
                this.threatActors = data as ThreatActor[];
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

    public deletButtonClicked(threatActor: ThreatActor): void {
        super.openDialog(threatActor).subscribe(
            () => {
                 this.filteredItems = this.filteredItems.filter((h) => h.id !== threatActor.id);
            }
        );
    }
}
