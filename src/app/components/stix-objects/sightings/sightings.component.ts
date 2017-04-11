import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'sightings',
  styleUrls: ['./sightings.component.css'],
  templateUrl: './sightings.component.html'
})
export class SightingsComponent implements OnInit {

    constructor() {
        console.log('Initial SightingsComponent');
    }
    public ngOnInit() {
        console.log('Initial SightingsComponent');
    }
}
