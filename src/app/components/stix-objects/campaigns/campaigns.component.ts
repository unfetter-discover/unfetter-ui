import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'campaigns',
  styleUrls: ['./campaigns.component.css'],
  templateUrl: './campaigns.component.html'
})
export class CampaignsComponent implements OnInit {

    constructor() {
        console.log('Initial CampaignsComponent');
    }
    public ngOnInit() {
        console.log('Initial CampaignsComponent');
    }
}
