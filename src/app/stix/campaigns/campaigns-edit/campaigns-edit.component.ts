import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CampaignComponent } from '../campaign/campaign.component';
import { StixService } from '../../stix.service';
import { Campaign } from '../../../models';

@Component({
  selector: 'campaigns-edit',
  templateUrl: './campaigns-edit.component.html',
})
export class CampaignsEditComponent extends CampaignComponent implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
    }

    public ngOnInit() {
        super.loadCampaign();
    }

    public saveCampaign(): void {
       let subscription = super.saveButtonClicked().subscribe(
            (data) => {
               console.log('saved');
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
