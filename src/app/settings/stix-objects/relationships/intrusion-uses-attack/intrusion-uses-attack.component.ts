import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { MitigateComponent } from '../mitigates/mitigate.component';
import { StixService } from '../../../stix.service';
import { IntrusionSet } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
    selector: 'intrusion-uses-attack',
    templateUrl: './intrusion-uses-attack.component.html'
})
export class IntrusionUsesAttackComponent extends MitigateComponent  implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.INTRUSION_SET_URL;
    }

    public ngOnInit() {
        this.title = 'Mapping Intrusion Sets to Attack Patterns';
        this.description = 'This page allows your to quickly create relationships between an Intrusion Set and the the Attack Patterns that it uses. Every selected checkbox is a relationship.';
        let subscription =  super.get().subscribe(
            (data) => {
                this.target = data as IntrusionSet;
                super.loadAttachPatteren();
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
