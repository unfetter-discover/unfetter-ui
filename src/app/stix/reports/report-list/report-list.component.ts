import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Report } from '../../../models';

@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html',
})

export class ReportsListComponent extends BaseStixComponent implements OnInit {
    private reports: Report[] = [];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog) {

        super(stixService, route, router, dialog);
        stixService.url = 'api/reports';

        console.log('Initial ReportsListComponent');
    }

    public ngOnInit() {
        console.log('Initial ReportsListComponent');
        let subscription =  super.load().subscribe(
            (data) => {
                this.reports = data as Report[];
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

    public editButtonClicked(report: Report): void {
        let link = ['edit', report.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(report: Report): void {
        super.openDialog(report);
    }
}
