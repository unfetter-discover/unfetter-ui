import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Constance } from '../../../../utils/constance';
import { StixService } from '../../../stix.service';
import { SensorComponent } from '../sensor/sensor.component';

@Component({
  selector: 'sensor-list',
  templateUrl: './sensor-list.component.html'
})

export class SensorListComponent extends SensorComponent implements OnInit {

    public sensors = [];
    public filterAttackPattern = {};
    public url = Constance.X_UNFETTER_SENSOR_URL;

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
        let filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.name': '1' }));
        let subscription =  super.load(filter).subscribe(
            (data) => {
                this.sensors = data;
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

    public edit(sensor: any): void {
        let link = ['edit', sensor.id];
        super.gotoView(link);
    }

    public showDetails(event: any,  sensor: any): void {
        event.preventDefault();
        let link = ['.', sensor.id];
        super.gotoView(link);
    }

    public deletButtonClicked(sensor: any): void {
        super.openDialog(sensor).subscribe(
            () => {
                this.filteredItems = this.filteredItems.filter((h) => h.id !== sensor.id);
            }
        );
    }
}
