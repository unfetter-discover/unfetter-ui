import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BaseStixComponent } from '../../base-stix.component';
import { StixService } from '../../stix.service';
import { Indicator } from '../../../models';

@Component({
  selector: 'indicator',
  templateUrl: './indicator.component.html'
})
export class IndicatorComponent extends BaseStixComponent implements OnInit {

   protected indicator: Indicator = new Indicator();

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location) {

        super(stixService, route, router, dialog);
        stixService.url = 'cti-stix-store-api/indicators';
    }

    public ngOnInit() {
        console.log('Initial IndicatorComponent');
        this.loadIndicator();
    }

    protected loadIndicator(): void {
        let subscription =  super.get().subscribe(
            (data) => {
                this.indicator = data as Indicator;

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
               let subscription = super.save(this.indicator).subscribe(
                    (data) => {
                        observer.next(data);
                        observer.complete();
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

    protected editButtonClicked(): void {
        let link = ['../edit', this.indicator.id];
        super.gotoView(link);
    }

    protected deleteButtonClicked(): void {
        super.openDialog(this.indicator);
    }
}
