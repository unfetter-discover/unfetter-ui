import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
    private pageTitle = 'Reports';
    private pageIcon = 'assets/icon/stix-icons/svg/report-b.svg';
    constructor() {
        console.log('Initial ReportsComponent');
    }
    public ngOnInit() {
        console.log('Initial ReportsComponent');
    }
}
