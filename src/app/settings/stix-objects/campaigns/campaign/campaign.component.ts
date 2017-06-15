import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { Constance } from '../../../../utils/constance';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Campaign, Filter } from '../../../../models';

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
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.CAMPAIGN_URL;
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
        let sub =  super.get().subscribe(
            (data) => {
                this.campaign = new Campaign(data);
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (sub) {
                    sub.unsubscribe();
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
