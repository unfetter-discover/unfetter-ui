import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { AttackPattern } from '../../../models';
import { Constance } from '../../../utils/constance';

@Component({
    selector: 'attack-patterns-home',
    template: `<page-header [pageTitle]="pageTitle"  [pageIcon]="pageIcon" [description]="description"></page-header>`,

})
export class SensorHomeComponent {
    public pageTitle = 'Sensor';
    public pageIcon = Constance.X_UNFETTER_SENSOR_ICON;

    public description = 'Each Attack Pattern is a type of TTP that describes behaviors and actions that adversaries may take in your network.' +
                '  Attack Patterns are used to help categorize an attack, generalize specific attacks to the patterns that they follow, ' +
                'and provide detailed information about how attacks are preformed.  An example of an attack pattern could be \'spear fishing\',' +
                ' \'lateral movement\', or \'exploit vulnerability\'.  On this page, more Attack Patterns can be created or deleted.';
}
