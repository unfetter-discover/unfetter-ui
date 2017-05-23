
import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { Constance } from '../utils/constance';
import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { StixService } from '../stix/stix.service';
import { BaseStixService } from '../stix/base-stix.service';
import { IntrusionSet } from '../models';

@Component({
  selector: 'intrusion-set-dashboard',
  templateUrl: 'intrusion-set-dashboard.component.html',
})
export class IntrusionSetDashboardComponent implements OnInit {

  private duration = 3000;
  private intrusionSets: IntrusionSet[] = [];

  constructor(
    protected service: StixService,
    protected snackBar: MdSnackBar) {
  }

  public ngOnInit() {
    console.log('intrusion set dashboard init');
    this.service.url = Constance.INTRUSION_SET_URL;
    this.service.load().subscribe(
      (data) => {
        this.intrusionSets = data;
      }, (error) => {
        // handle errors here
        console.log('error ' + error);
      }
    );
  }

  // private loadItems(observer: any): void {
  //   console.log('load items from ' + this.service.url);
  //   let subscription = this.service.load().subscribe(
  //           (stixObjects) => {
  //               observer.next(stixObjects);
  //               observer.complete();
  //           }, (error) => {
  //               // handle errors here
  //               this.snackBar.open('Error ' + error , '', {
  //                    duration: this.duration,
  //                    extraClasses: ['snack-bar-background-error']
  //               });
  //           }, () => {
  //               // prevent memory links
  //               if (subscription) {
  //                   subscription.unsubscribe();
  //               }
  //           }
  //       );
  // }

}
