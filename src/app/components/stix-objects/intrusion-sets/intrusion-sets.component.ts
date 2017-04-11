import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'intrusion-sets',
  styleUrls: ['./intrusion-sets.component.css'],
  templateUrl: './intrusion-sets.component.html'
})
export class IntrusionSetsComponent implements OnInit {

    constructor() {
        console.log('Initial IntrusionSetsComponent');
    }
    public ngOnInit() {
        console.log('Initial IntrusionSetsComponent');
    }
}
