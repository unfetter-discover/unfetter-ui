import { Component, OnInit, } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'events-content',
  templateUrl: './events-content.component.html',
  styleUrls: ['./events-content.component.scss']
})
export class EventsContentComponent implements OnInit {

  readonly columnIds: string[];

  constructor( public service: EventsService, ) {
    this.columnIds = ['date', 'ip', 'city', 'country', 'attack_pattern', 'potential actor'];
  }

  ngOnInit() {
  }
}
