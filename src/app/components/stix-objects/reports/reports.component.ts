import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'reports',
  styleUrls: ['./reports.component.css'],
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

    constructor() {
        console.log('Initial ReportsComponent');
    }
    public ngOnInit() {
        console.log('Initial ReportsComponent');
    }
}
