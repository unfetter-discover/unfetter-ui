import { Component, OnInit } from '@angular/core';
import { CampaignService } from './campaigns.service';

@Component({
  selector: 'campaigns',
  templateUrl: './campaigns-home.component.html',
})
export class CampaignsHomeComponent implements OnInit {
    private pageTitle = 'Campaigns';
    private pageIcon = 'assets/icon/stix-icons/svg/campaign-b.svg';

    constructor(private campaignService: CampaignService) {
        console.log('Initial CampaignsHomeComponent');
    }
    public ngOnInit() {
        console.log('Initial CampaignsHomeComponent');
    }
}
