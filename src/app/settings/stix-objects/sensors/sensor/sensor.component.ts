import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { Constance } from '../../../../utils/constance';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';

@Component({
  selector: 'sensor',
  templateUrl: './sensor.component.html'
})
export class SensorComponent extends BaseStixComponent implements OnInit {

    public sensor: any = {
        attributes: {
            aliases: [],
            kill_chain_phases: [],
            description: ''
        },
        type: 'x-unfetter-sensor'
    };

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.X_UNFETTER_SENSOR_URL;
    }

    public ngOnInit() {
        this.loadSensor();
    }

    public editButtonClicked(): void {
        let link = ['../edit', this.sensor.id];
        super.gotoView(link);
    }

    public deleteButtonClicked(): void {
        super.openDialog(this.sensor).subscribe(
            () => {
                this.location.back();
            }
        );
    }

    protected loadSensor(): void {
        let sub =  super.get().subscribe(
            (data) => {
                this.sensor = data;
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
               let subscription = super.save(this.sensor).subscribe(
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
