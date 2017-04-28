import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { ThreatActor } from '../../../models';

@Component({
  selector: 'threat-actor-list',
  templateUrl: './threat-actor-list.component.html',
})
export class ThreatActorListComponent extends BaseStixComponent implements OnInit {
    private threatActors: ThreatActor[] = [];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog) {

        super(stixService, route, router, dialog);
        stixService.url = 'cti-stix-store-api/threat-actors';

        console.log('Initial ThreatActorListComponent');
    }

    public ngOnInit() {
        console.log('Initial ThreatActorListComponent');
        let subscription =  super.load().subscribe(
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
}
