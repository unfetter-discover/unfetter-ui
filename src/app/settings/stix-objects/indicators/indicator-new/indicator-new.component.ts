import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IndicatorEditComponent } from '../indicator-edit/indicator-edit.component';
import { StixService } from '../../../stix.service';
import { Indicator } from '../../../../models';

@Component({
  selector: 'indicator-new',
  templateUrl: './indicator-new.component.html',
})
export class IndicatorNewComponent extends IndicatorEditComponent implements OnInit {

   public indicator: Indicator = new Indicator();

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit(): void  {
        // empty
    }

    public saveIndicator(): void {
         let sub = super.create(this.indicator).subscribe(
            (data) => {
                this.location.back();
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
}
