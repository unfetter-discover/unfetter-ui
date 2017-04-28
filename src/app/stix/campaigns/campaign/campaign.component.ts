import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Campaign } from '../../../models';

@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html'
})
export class CampaignComponent extends BaseStixComponent implements OnInit {

    public campaign: Campaign;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog);
        stixService.url = 'api/campaigns';
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
