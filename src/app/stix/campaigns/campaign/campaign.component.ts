import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Campaign } from '../../../models';

@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html'
})
export class CampaignComponent extends BaseStixComponent implements OnInit {

    protected campaign: Campaign = new Campaign();

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog);
        stixService.url = 'cti-stix-store-api/campaigns';
    }

    public ngOnInit() {
        this.loadCampaign();
    }

    public editButtonClicked(): void {
        let link = ['../edit', this.campaign.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.campaign);
    }

    protected loadCampaign(): void {
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

    protected saveButtonClicked(): Observable<any> {
        return Observable.create((observer) => {
               let subscription = super.save(this.campaign).subscribe(
                    (data) => {
                        observer.next(data);
                        observer.complete();
                        this.location.back();
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
        });
    }

}
