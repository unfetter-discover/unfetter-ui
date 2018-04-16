import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { StreamSightingIds } from '../store/events.actions';
import { EventsState } from '../store/events.reducers';

@Component({
  selector: 'events-layout',
  templateUrl: './events-layout.component.html',
  styleUrls: ['./events-layout.component.scss']
})
export class EventsLayoutComponent implements OnInit {

  constructor(private store: Store<EventsState>) { }

  ngOnInit() {
    this.store.dispatch(new StreamSightingIds());
  }

}
