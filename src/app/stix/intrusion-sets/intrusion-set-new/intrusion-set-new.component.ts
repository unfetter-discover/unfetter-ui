import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { IntrusionSetEditComponent } from '../intrusion-set-edit/intrusion-set-edit.component';
import { StixService } from '../../stix.service';
import { IntrusionSet } from '../../../models';

@Component({
  selector: 'intrusion-set-new',
  templateUrl: './intrusion-set-new.component.html',
})
export class IntrusionSetNewComponent extends IntrusionSetEditComponent implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
    }

    public saveIdentity(): void {
         let sub = super.create(this.intrusionSet).subscribe(
            (data) => {
                console.log('saved');
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
