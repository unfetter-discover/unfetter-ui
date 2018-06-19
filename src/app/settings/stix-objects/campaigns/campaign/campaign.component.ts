import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { Constance } from '../../../../utils/constance';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Campaign, Filter } from '../../../../models';

@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html'
})
export class CampaignComponent extends BaseStixComponent implements OnInit {

    public campaign: Campaign = new Campaign();

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

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
        super.openDialog(this.campaign).subscribe(
            () => {
                this.location.back();
            }
        );
    }

    public loadCampaign(): void {
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

    public saveButtonClicked(): Observable<any> {
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
