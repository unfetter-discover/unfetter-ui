import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
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
    public identities: Identity[] = [];
    public showSectors = true;
    public showExternalReferences = true;
    public url: string;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        this.url = stixService.url;
    }

    public ngOnInit() {
        let filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.name': '1' }));
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
                 this.filteredItems = this.filteredItems.filter((h) => h.id !== identity.id);
            }
        );
    }
}
