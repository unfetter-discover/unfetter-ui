import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Report } from '../../../models';

@Component({
  selector: 'report-new',
  templateUrl: './report-new.component.html',
})
export class ReportNewComponent extends BaseStixComponent implements OnInit {
  public intrusionSets: any = [];
  private report: Report = new Report();
  private labels = ['Indicator', 'Campaign', 'Intrusion Set' ];

   constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
        stixService.url = 'api/reports';
        console.log('Initial ReportNewComponent');
    }
    public ngOnInit() {
        console.log('Initial ReportNewComponent');
    }

    public saveButtonClicked(): void {
        let subscription = super.save(this.report).subscribe(
            (data) => {
                this.report = data as Report;
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
    }
}
