import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar } from '@angular/material';
import { SensorComponent } from '../sensor/sensor.component';
import { StixService } from '../../../stix.service';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'sensor-edit',
  templateUrl: './sensor-edit.component.html'
})

export class SensorEditComponent extends SensorComponent implements OnInit {

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {
        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
       let sub = super.get().subscribe(
        (data) => {
            this.sensor =  data;
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

    public saveSensor(): void {
         let sub = super.saveButtonClicked().subscribe(
            (data) => {
                this.sensor =  data;
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
