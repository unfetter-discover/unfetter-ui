import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Campaign } from '../../../models';
@Component({
  selector: 'campaigns-new',
  templateUrl: './campaigns-new.component.html'
})
export class CampaignsNewComponent extends BaseStixComponent implements OnInit {
    public campaign: Campaign = new Campaign();
    public selectedValue1: string;
    public selectedValue2: string;
    public selectedValue3: string;
    public selectedValue4: string;
    public selectedValue5: string;
    private foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

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
        console.log('Initial CampaignsNewComponent');
    }

    public cancel(): void {
        this.location.back();
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
