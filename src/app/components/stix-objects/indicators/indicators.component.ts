import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'indicators',
  styleUrls: ['./indicators.component.css'],
  templateUrl: './indicators.component.html'
})
export class IndicatorsComponent implements OnInit {

    constructor() {
        console.log('Initial IndicatorsComponent');
    }
    public ngOnInit() {
        console.log('Initial IndicatorsComponent');
    }
}
