import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { CampaignService } from '../campaigns.service';
import { Campaign } from '../../../models';

@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html',
  providers: [
    CampaignService
  ]
})
export class CampaignComponent extends BaseStixComponent implements OnInit {

    public campaign: Campaign;

    constructor(
        public campaignService: CampaignService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(campaignService, route, router, dialog);
    }

    public ngOnInit() {
        console.log('Initial CampaignComponent');
        let subscription =  super.get().subscribe(
            (data) => {
                this.campaign = data as Campaign;
                console.dir(this.campaign );
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

    public editButtonClicked(): void {
        let link = ['../edit', this.campaign.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.campaign);
    }
}
