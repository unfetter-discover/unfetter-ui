import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'campaigns',
  templateUrl: './campaigns-home.component.html',
})
export class CampaignsHomeComponent implements OnInit {
    private pageTitle = 'Campaigns';
    private pageIcon = 'assets/icon/stix-icons/svg/campaign-b.svg';

    constructor() {
        console.log('Initial CampaignsHomeComponent');
    }
    public ngOnInit() {
        console.log('Initial CampaignsHomeComponent');
    }
}
