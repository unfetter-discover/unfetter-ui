import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Campaign } from '../../../models';

@Component({
  selector: 'campaigns-edit',
  templateUrl: './campaigns-edit.component.html',
})
export class CampaignsEditComponent extends BaseStixComponent implements OnInit {

    public campaign: Campaign = new Campaign();

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
