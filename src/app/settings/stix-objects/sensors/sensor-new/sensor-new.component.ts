import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { SensorEditComponent } from '../sensor-edit/sensor-edit.component';
import { StixService } from '../../../stix.service';
import { Constance } from '../../../../utils/constance';

@Component({
    selector: 'sensor-new',
    templateUrl: './sensor-new.component.html'
})
export class SensorNewComponent extends SensorEditComponent implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {
        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
       this.stixService.url = Constance.X_UNFETTER_SENSOR_URL;
    }

    public saveNewSensor(): void {
        this.sensor.url = Constance.X_UNFETTER_SENSOR_URL;
        const sub = super.create(this.sensor).subscribe(
            (data) => {
                // this.sensor = data;
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
