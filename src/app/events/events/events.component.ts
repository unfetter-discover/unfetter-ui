import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../root-store/app.reducers';
import { EventsState } from '../store/events.reducers';
import { UserProfile } from '../../models/user/user-profile';
import { CleanSightingsData, LoadSightingsData, StreamSightingIds } from '../store/events.actions';
import { Subscription } from 'rxjs/Subscription';
import { Sighting } from '../../models';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[];

  constructor(private userStore: Store<AppState>,
    private store: Store<EventsState>,
    public service: EventsService) {
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit() {
    const userSub$ = this.userStore
      .select('users')
      .pluck('userProfile')
      .take(1)
      .subscribe((user: UserProfile) => {
        this.service.recentSightings = undefined;
        this.service.finishedLoading = false;
        this.store.dispatch(new CleanSightingsData());
        this.store.dispatch(new LoadSightingsData(user.organizations));
      },
        (err) => console.log(err));
    this.subscriptions.push(userSub$);    
    this.listenForDataChanges();
  }

/**
 * @description close open subscriptions, clean up resources when we destroy this component
 * @return {void}
 */
  public ngOnDestroy(): void {
    this.subscriptions
      .filter((el) => el !== undefined)
      .forEach((sub) => sub.unsubscribe());
    this.store.dispatch(new CleanSightingsData());
  }

  public listenForDataChanges() {
    const sub1$ = this.store
      .select('sightings')
      .pluck('sightings')
      .distinctUntilChanged()
      .filter((arr: Sighting[]) => arr && arr.length > 0)
      .subscribe((arr: Sighting[]) => {
        this.service.recentSightings = [...arr];
      },
        (err) => console.log(err));

    const sub2$ = this.store
      .select('sightings')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .filter((el) => el === true)
      .subscribe((done: boolean) => {
        if (this.service.recentSightings === undefined) {
          // fetching the summary failed, set all flags to done
          this.service.finishedLoading = done;
          return;
        }
        this.service.finishedLoading = done;
        this.transformSummary()
      }, (err) => console.log(err));

    this.subscriptions.push(sub1$, sub2$);
  }

  public transformSummary() {
    if (!this.service.recentSightings) {
      this.service.recentSightings = new Array<Sighting>();
    }
    // dummy data
    for (let i = 0; i < 20; i++) {
      const sighting = new Sighting();
      // sighting.attributes.sighting_of_ref is some id
      sighting.attributes['sighting_of_ref_name'] = 'Commonly Used Port';
      // sighting.attributes.observed_data_refs[] holds ids
      sighting.attributes.observed_data_refs.push('123.23.2340');
      sighting.attributes['observed_data_refs_city'] = 'Kyiv';
      sighting.attributes['observed_data_refs_country'] = 'UA';
      sighting.attributes['sighting_of_ref_name_intrusion_set_group'] = 'APT3';
      this.service.recentSightings.unshift(sighting);
    }

  }

}
