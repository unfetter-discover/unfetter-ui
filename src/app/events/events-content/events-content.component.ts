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
    // dummy data
    for (let i = 0; i < 50; i++) {
      const sighting = new Sighting();
      // sighting.attributes.sighting_of_ref is some id
      sighting.attributes['sighting_of_ref_name'] = 'Commonly Used Port';
      // sighting.attributes.observed_data_refs[] holds ids
      sighting.attributes.observed_data_refs.push('123.23.2340');
      sighting.attributes['observed_data_refs_city'] = 'Kyiv';
      sighting.attributes['observed_data_refs_country'] = 'UA';
      sighting.attributes['sighting_of_ref_name_intrusion_set_group'] = 'APT3';
      this.recentSightings.push(sighting);
    }

  }
}
