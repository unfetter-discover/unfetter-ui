import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentityComponent } from '../identity/identity.component';
import { StixService } from '../../../stix.service';
import { Identity } from '../../../../models';

@Component({
  selector: 'identity-set-list',
  templateUrl: './identity-list.component.html',
})
export class IdentityListComponent extends IdentityComponent implements OnInit {
    private identities: Identity[] = [];
    private showSectors = true;
    private showExternalReferences = true;

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
        let filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '-1' }));
        let subscription =  super.load(filter).subscribe(
            (data) => {
                this.identities = data as Identity[];
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

    public deletButtonClicked(identity: Identity): void {
        super.openDialog(identity).subscribe(
            () => {
                 this.identities = this.identities.filter((h) => h.id !== identity.id);
            }
        );
    }
}
