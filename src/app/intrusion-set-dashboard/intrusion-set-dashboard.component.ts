
import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { Constance } from '../utils/constance';
import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { StixService } from '../settings/stix.service';
import { BaseStixService } from '../settings/base-stix.service';
import { IntrusionSet } from '../models';

@Component({
  selector: 'intrusion-set-dashboard',
  templateUrl: 'intrusion-set-dashboard.component.html',
})
export class IntrusionSetDashboardComponent implements OnInit {

  private selectedIntrusionSet = [];
  private duration = 3000;
  private intrusionSet: IntrusionSet;
  private results: any[];
  private intrusionSets: IntrusionSet[] = [];
  private intrusionSetsDashboard = {};
  
  private autoTicks = false;
  private disabled = false;
  private invert = false;
  private max = 100;
  private min = 0;
  private showTicks = false;
  private step = 1;
  private thumbLabel = true;
  private value = 40;
  private vertical = false;


  private _tickInterval = 1;
  
  constructor(
    protected service: StixService,
    protected snackBar: MdSnackBar) {
  }

  public ngOnInit() {
    console.log('intrusion set dashboard init');
    this.service.url = Constance.INTRUSION_SET_URL;
    let filter = 'filter[order]=name';
    this.service.load(filter).subscribe(
      (data) => {
        this.intrusionSets = data;
      }, (error) => {
        // handle errors here
        console.log('error ' + error);
      }
    );
  }

  private select(intrusionSet: IntrusionSet, isAutoComplete?: boolean): void {
    let found = this.selectedIntrusionSet.find(
        (i) => {
          return intrusionSet.id === i.id;
        }
      );
      if (found) {
        if (!isAutoComplete) {
          this.selectedIntrusionSet = this.selectedIntrusionSet.filter(
            (i) => {
                return intrusionSet.id !== i.id;
            }
          );
        }
      } else {
        this.selectedIntrusionSet.push(intrusionSet);
      }
  }
  
  private searchIntrusionSets(): void {
    let ids = [];
    this.selectedIntrusionSet.forEach(
      (intrusionSet) => {
          ids.push(intrusionSet.id);
      }
    );
    let url = 'api/dashboards/intrusionSetView?intrusionSetIds=' + ids.join();
    this.service.getByUrl(url).subscribe(
      (data: any) => {
        this.intrusionSetsDashboard = data;
    });
  }

  private search(event) {
        this.results = [];
        this.intrusionSets.filter(
          (intrusionSet) => {
              return intrusionSet.attributes.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0;
          }
        ).forEach(
          (intrusionSet) => {
              this.results.push({ id: intrusionSet.id, name: intrusionSet.attributes.name });
          }
        );
  }

  private remove(event: any, intrusionSet: IntrusionSet): void {
       event.preventDefault();
       this.selectedIntrusionSet = this.selectedIntrusionSet.filter(
         (i) => {
           return i.id !== intrusionSet.id;
         }
       );
       intrusionSet.checked = false;
  }

  private removeAll(event): void {
    event.preventDefault();
    this.selectedIntrusionSet.forEach(
      (intrusionSet) => {
        this.remove(event, intrusionSet);
      }
    )
  }

  private onSelect(event): void {
      let intrusionSet = this.intrusionSets.find(
        (intrusionSet) => {
          return intrusionSet.id === event.id;
        }
      );
      intrusionSet.checked = true;
      this.select(intrusionSet, true);      
  }

  private get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : null;
  }
  
  private set tickInterval(v) {
    this._tickInterval = Number(v);
  }

}
