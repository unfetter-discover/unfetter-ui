import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { IntrusionSet } from '../../../models';

@Component({
  selector: 'intrusion-set-list',
  templateUrl: './intrusion-set-list.component.html',
})
export class IntrusionSetListComponent extends BaseStixComponent implements OnInit {
    private intrusionSets: IntrusionSet[] = [];
    private showLabels = false;
    private showExternalReferences = false;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog) {

        super(stixService, route, router, dialog);
        stixService.url = 'api/intrusion-sets';
        console.log('Initial IntrusionSetListComponent');
    }

    public ngOnInit() {
        console.log('Initial IntrusionSetListComponent');
        let subscription =  super.load().subscribe(
            (data) => {
                this.intrusionSets = data as IntrusionSet[];
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
