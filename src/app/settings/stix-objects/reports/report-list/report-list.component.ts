import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Report } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html',
})

export class ReportsListComponent extends BaseStixComponent implements OnInit {
    public reports: Report[] = [];

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.REPORTS_URL;
    }

    public ngOnInit() {
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
        super.openDialog(report).subscribe(
            () => {
                 this.reports = this.reports.filter((h) => h.id !== report.id);
            }
        );
    }
}
