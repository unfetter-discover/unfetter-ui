import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { ThreatActorEditComponent } from '../threat-actor-edit/threat-actor-edit.component';
import { StixService } from '../../stix.service';
import { ThreatActor } from '../../../models';

@Component({
  selector: 'threat-actor-new',
  templateUrl: './threat-actor-new.component.html',
})
export class ThreatActorNewComponent extends ThreatActorEditComponent implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
    }

     public saveThreatActor(): void {
         let sub = super.create(this.threatActor).subscribe(
            (data) => {
                console.log('saved');
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
}
