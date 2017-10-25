import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar } from '@angular/material';

import { IdentityComponent } from '../identity/identity.component';
import { StixService } from '../../../stix.service';
import { Identity } from '../../../../models';
import { Constance } from '../../../../utils/constance'

@Component({
    selector: 'identity-edit',
    styles: [
        ' .identity-radio-group {display: inline-flex; flex-direction: column;}',
        '.identity-radio-button {margin: 5px;}',
        '.identity-selected-value { margin: 15px 0;}'
    ],
    templateUrl: './identity-edit.component.html',
})
export class IdentityEditComponent extends IdentityComponent implements OnInit {

    public identityClasses = Constance.IDENTITY_CLASSES;

    public sectorOptions = Constance.IDENTITY_SECTOR_OPTIONS;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
        this.loadIdentity();
    }

    public isChecked(sector: string): boolean {
        return super.foundSector(sector);
    }

     public saveIdentity(): void {
         let sub = super.saveButtonClicked().subscribe(
            (data) => {
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
