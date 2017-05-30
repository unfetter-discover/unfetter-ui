
import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { StixService } from '../stix/stix.service';
import { BaseComponentService } from '../components/base-service.component' 

import { Constance } from '../utils/constance';
import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { IntrusionSet } from '../models';

@Component({
  selector: 'intrusion-set-dashboard',
  templateUrl: 'intrusion-set-dashboard.component.html',
})
  
export class IntrusionSetDashboardComponent implements OnInit {

  protected intrusionSets: IntrusionSet[] = [];
  protected selectedIntrusionSet = {};
  protected selectedIntrusionSetAttackPatterns = [];

  constructor(
    protected stixService: StixService,
    protected baseService: BaseComponentService,
    protected snackBar: MdSnackBar) {
  }

  public ngOnInit() {
    this.stixService.url = Constance.INTRUSION_SET_URL;
    let filter = 'filter[order]=name';
    this.stixService.load(filter).subscribe(
      (data) => {
        this.intrusionSets = data;
      }, (error) => {
        // handle errors here
        console.log('error ' + error);
      }
    );
  }

  protected select(intrusionSet) : void {
    this.selectedIntrusionSet = intrusionSet.attributes;
    let url = `api/relationships/intrusionSetUsesAttackPatterns?intrusionSetId=${intrusionSet.id}`;
    this.baseService.get(url).subscribe(
      (data) => {
        this.selectedIntrusionSetAttackPatterns = data;
      }, (error) => {
        // handle errors here
        console.log('error ' + error);
      }
    );
  }

}
