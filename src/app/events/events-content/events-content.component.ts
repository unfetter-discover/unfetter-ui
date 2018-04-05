import { Component, OnInit } from '@angular/core';
import { Sighting } from '../../models';
import { Store } from '@ngrx/store';
import { AppState } from '../../root-store/app.reducers';
import { UserProfile } from '../../models/user/user-profile';
import { Subscription } from 'rxjs/Subscription';
import { EventsState } from '../store/events.reducers';
import { CleanSightingsData, LoadSightingsData } from '../store/events.actions';

@Component({
  selector: 'events-content',
  templateUrl: './events-content.component.html',
  styleUrls: ['./events-content.component.scss']
})
export class EventsContentComponent implements OnInit {

  recentSightings: Sighting[];
  readonly columnIds: string[];
  private readonly subscriptions: Subscription[] = [];

  constructor(private userStore: Store<AppState>, 
    private store: Store<EventsState>, ) {
    this.columnIds = ['date', 'ip', 'city', 'country', 'attack_pattern', 'potential actor'];
  }

  ngOnInit() {
    const userSub$ = this.userStore
      .select('users')
      .pluck('userProfile')
      .take(1)
      .subscribe((user: UserProfile) => {
        this.recentSightings = new Array<Sighting>();
        this.store.dispatch(new CleanSightingsData());

        console.log(JSON.stringify(user.organizations));
        this.store.dispatch(new LoadSightingsData(user.organizations));
      },
        (err) => console.log(err));
    this.subscriptions.push(userSub$);

    if (!this.recentSightings) {
      this.recentSightings = new Array<Sighting>();
    }
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
