import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { StixService } from '../../stix.service';
import { IntrusionSet } from '../../../models';

@Component({
  selector: 'intrusion-set-edit',
  templateUrl: './intrusion-set-edit.component.html',
})
export class IntrusionSetEditComponent extends IntrusionSetComponent implements OnInit {

     protected labels = [
        {label: 'activist'},
        {label: 'competitor'},
        {label: 'crime-syndicate'},
        {label: 'criminal'},
        {label: 'hacker'},
        {label: 'insider-accidental'},
        {label: 'insider-disgruntled'},
        {label: 'nation-state'},
        {label: 'sensationalist'},
        {label: 'spy'},
        {label: 'terrorist'}
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
       super.loadIntrusionSet();
    }

    public isChecked(label: string): boolean {
        let found = this.intrusionSet.attributes.labels.find((l) => {
            return l === label;
        });
        return found ? true : false;
    }

    public addLabel(label: string) {
        this.intrusionSet.attributes.labels.push(label);
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
