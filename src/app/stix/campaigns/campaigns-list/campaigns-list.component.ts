import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CampaignComponent } from '../campaign/campaign.component';
import { StixService } from '../../stix.service';
import { Campaign } from '../../../models';

@Component({
  selector: 'campaigns-list',
  templateUrl: './campaigns-list.component.html'
})

export class CampaignsListComponent extends CampaignComponent implements OnInit {

    public campaigns: Campaign[] = [];
    private showExternalReferences: boolean = false;
    private showLabels: boolean = false;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
    }

    public ngOnInit() {
       let subscription =  super.load().subscribe(
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

     public delete(campaigns: Campaigns): void {
        super.openDialog(campaigns).subscribe(
            () => {
                 this.campaigns = this.campaigns.filter((h) => h.id !== campaigns.id);
            }
        );
    }
}
