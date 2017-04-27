import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { CampaignService } from '../campaigns.service';
import { Campaign } from '../../../models';

@Component({
  selector: 'campaigns-edit',
  templateUrl: './campaigns-edit.component.html',
  providers: [
    CampaignService
  ]
})
export class CampaignsEditComponent extends BaseStixComponent implements OnInit {

    public campaign: Campaign = new Campaign();

    constructor(
        public campaignService: CampaignService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(campaignService, route, router, dialog);
    }

    public ngOnInit() {
       let subscription =  super.get().subscribe(
            (data) => {
                this.campaign = data as Campaign;
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

   public saveButtonClicked(): void {
       let subscription = super.save(this.campaign).subscribe(
            (data) => {
                this.campaign = data as Campaign;
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
