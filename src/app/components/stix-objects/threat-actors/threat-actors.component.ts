import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'threat-actors',
  styleUrls: ['./threat-actors.component.css'],
  templateUrl: './threat-actors.component.html'
})
export class ThreatActorsComponent implements OnInit {

    constructor() {
        console.log('Initial ThreatActorsComponent');
    }
    public ngOnInit() {
        console.log('Initial ThreatActorsComponent');
    }
}
