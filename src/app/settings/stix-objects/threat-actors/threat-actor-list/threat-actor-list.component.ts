import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TheatActorComponent } from '../threat-actor/threat-actors.component';
import { StixService } from '../../../stix.service';
import { ThreatActor } from '../../../../models';

@Component({
  selector: 'threat-actor-list',
  templateUrl: './threat-actor-list.component.html',
})
export class ThreatActorListComponent extends TheatActorComponent implements OnInit {
    private threatActors: ThreatActor[] = [];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
        let filter = 'filter[order]=name';
        let subscription =  super.load(filter).subscribe(
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
                 this.threatActors = this.threatActors.filter((h) => h.id !== threatActor.id);
            }
        );
    }
}
