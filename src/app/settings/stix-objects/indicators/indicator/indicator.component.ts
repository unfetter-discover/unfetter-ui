import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Indicator } from '../../../../models';
import { Constance } from '../../../../utils/constance';

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
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.INDICATOR_URL;
    }

    public ngOnInit() {
        console.log('Initial IndicatorComponent');
        this.loadIndicator();
    }

    protected loadIndicator(): void {
        let subscription =  super.get().subscribe(
            (data) => {
                this.indicator =  new Indicator(data);
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
        super.openDialog(this.indicator).subscribe(
            () => {
                this.location.back();
            }
        );
    }

    // private loadRelationships(filter: any): Observable<any> {
    //     let url = Constance.RELATIONSHIPS_URL + '?filter=' + JSON.stringify(filter);
    //     return Observable.create((observer) => {
    //          let sub =  super.filter( encodeURI(url) ).subscribe(
    //             (data) => {
    //                 observer.next(data);
    //                 observer.complete();
    //             }, (error) => {
    //                 // handle errors here
    //                 console.log('error ' + error);
    //             }, () => {
    //                 // prevent memory links
    //                 if (sub) {
    //                     sub.unsubscribe();
    //                 }
    //             }
    //         );
    //      });
    // }
}
