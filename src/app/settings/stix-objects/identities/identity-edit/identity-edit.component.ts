import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { IdentityComponent } from '../identity/identity.component';
import { StixService } from '../../../stix.service';
import { Identity } from '../../../../models';

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

    protected identityClasses = [
        { label: 'individual', id: 'individual' },
        { label: 'group', id: 'group' },
        { label: 'organization', id: 'organization' },
        { label: 'class', id: 'class' },
        { label: 'unknown', id: 'unknown' }
    ];

    protected sectorOptions = [
            { label: 'agriculture', id: 'agriculture' },
            { label: 'aerospace', id: 'aerospace' },
            { label: 'automotive', id: 'automotive' },
            { label: 'communications', id: 'communications' },
            { label: 'construction', id: 'construction' },
            { label: 'defence', id: 'defence' },
            { label: 'education', id: 'education' },
            { label: 'energy', id: 'energy' },
            { label: 'entertainment', id: 'entertainment' },
            { label: 'financial services', id: 'financial-services' },
            { label: 'gov national', id: 'government-national' },
            { label: 'gov regional', id: 'government-regional' },
            { label: 'gov local', id: 'government-local' },
            { label: 'gov public services', id: 'government-public-services' },
            { label: 'healthcare', id: 'healthcare' },
            { label: 'hospitality leisure', id: 'hospitality-leisure' },
            { label: 'infrastructure', id: 'infrastructure' },
            { label: 'insurance', id: 'insurance' },
            { label: 'manufacturing', id: 'manufacturing' },
            { label: 'mining', id: 'mining' },
            { label: 'non profit', id: 'non-profit' },
            { label: 'pharmaceuticals', id: 'pharmaceuticals' },
            { label: 'retail', id: 'retail' },
            { label: 'technology', id: 'technology' },
            { label: 'telecommunications', id: 'telecommunications' },
            { label: 'transportation', id: 'transportation' },
            { label: 'utilities', id: 'utilities' }
        ];
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
        this.loadIdentity();
    }

    public isChecked(sector: string): boolean {
        return super.foundSector(sector);
    }

     public saveIdentity(): void {
         let sub = super.saveButtonClicked().subscribe(
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
