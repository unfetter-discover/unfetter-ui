import { Component, OnInit } from '@angular/core';
import { Sighting } from '../../models';

@Component({
  selector: 'events-content',
  templateUrl: './events-content.component.html',
  styleUrls: ['./events-content.component.scss']
})
export class EventsContentComponent implements OnInit {

  readonly recentSightings: Sighting[];
  readonly columnIds: string[];

  constructor() {
    this.columnIds = ['date', 'ip', 'city', 'country', 'attack_pattern', 'potential actor'];
    this.recentSightings = [];
  }

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.recentSightings.push(new Sighting());
    }

  }
}
