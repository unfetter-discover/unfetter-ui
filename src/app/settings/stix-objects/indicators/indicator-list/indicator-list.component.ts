import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { IndicatorComponent } from '../indicator/indicator.component';
import { StixService } from '../../../stix.service';
import { Indicator } from '../../../../models';

@Component({
  selector: 'indicator-list',
  templateUrl: './indicator-list.component.html',
})
export class IndicatorListComponent extends IndicatorComponent implements OnInit {
    public indicators: Indicator[];
    public model: any;
    public showPattern = true;
    public showKillChainPhases = true;
    public showExternalReferences = true;
    public url: string;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        this.url = stixService.url;
    }

    public ngOnInit() {
        let filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.name': '1' }));
        let subscription =  super.load(filter).subscribe(
            (data) => {
                this.indicators = data as Indicator[];
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

     public deletButtonClicked(indicator: Indicator): void {
        super.openDialog(indicator).subscribe(
            () => {
                 this.filteredItems = this.filteredItems.filter((h) => h.id !== indicator.id);
            }
        );
    }
}
