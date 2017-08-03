import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CampaignComponent } from '../campaign/campaign.component';
import { StixService } from '../../../stix.service';
import { Campaign } from '../../../../models';

@Component({
  selector: 'campaigns-list',
  templateUrl: './campaigns-list.component.html'
})

export class CampaignsListComponent extends CampaignComponent implements OnInit {

    public campaigns: Campaign[] = [];
    private showExternalReferences: boolean = false;
    private showLabels: boolean = false;
    private url = Campaign.url;

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
        let filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '-1' }));
        let subscription =  super.load(filter).subscribe(
            (data) => {
                this.campaigns = data as Campaign[] ;
                console.dir(this.campaigns);
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

     public deletButtonClicked(campaigns: Campaign): void {
        super.openDialog(campaigns).subscribe(
            () => {
                 this.campaigns = this.campaigns.filter((h) => h.id !== campaigns.id);
            }
        );
    }
}
