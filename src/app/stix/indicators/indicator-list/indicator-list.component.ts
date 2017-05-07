import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { IndicatorComponent } from '../indicator/indicator.component';
import { StixService } from '../../stix.service';
import { Indicator } from '../../../models';

@Component({
  selector: 'indicator-list',
  templateUrl: './indicator-list.component.html',
})
export class IndicatorListComponent extends IndicatorComponent implements OnInit {
    private indicators: Indicator[] = [];
    private model: any;
    private showPattern = true;
    private showKillChainPhases = true;
    private showExternalReferences = true;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog, location);
    }

    public ngOnInit() {

        let subscription =  super.load().subscribe(
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

     public delete(indicator: Indicator): void {
        super.openDialog(indicator).subscribe(
            () => {
                 this.indicators = this.indicators.filter((h) => h.id !== indicator.id);
            }
        );
    }
}
