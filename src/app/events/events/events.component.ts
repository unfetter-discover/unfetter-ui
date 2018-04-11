import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../root-store/app.reducers';
import { EventsState } from '../store/events.reducers';
import { UserProfile } from '../../models/user/user-profile';
import { CleanSightingsData, StreamSightingIds, LoadData } from '../store/events.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Sighting } from '../../models';
import { IPGeoService } from '../ipgeo.service';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[];
  private readonly ips = [];

  constructor(private userStore: Store<AppState>,
    private store: Store<EventsState>,
    public service: EventsService,
    public ipgeo: IPGeoService,
  ) {
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit() {
    this.service.recentSightings = undefined;
    this.service.finishedLoading = false;
    this.store.dispatch(new CleanSightingsData());
    this.store.dispatch(new LoadData());   
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
        this.makeIPs()
      }, (err) => console.log(err));

    this.subscriptions.push(sub1$, sub2$);
  }

  public makeIPs() {
    const subips$ = Observable
      .forkJoin([1, 2].map(v4 => this.ipgeo.lookup([1, 2, 3, 4].map(b => Math.floor(Math.random() * 256)).join('.'))))
      .finally(() => {
        if (subips$) {
          subips$.unsubscribe();
        }
        console.log('after', this.ips);
        this.transformSightings();
        this.service.finishedLoading = true;
      })
      .subscribe(resp => {
        const ip = [].concat.apply([], resp).filter(r => r.success);
        this.ips.push(...ip);
        while (this.ips.length < 2) {
          this.ips.push({});
        }
      });
  }

  private transformSightings() {
    if (!this.service.recentSightings) {
      this.service.recentSightings = new Array<Sighting>();
    }

    // dummy data
    for (let i = 0; i < 40; i++) {
      const ip = this.ips.shift();
      const sighting = new Sighting();
      sighting.attributes.last_seen = new Date(new Date().setDate(new Date().getDate() - i));
      // sighting.attributes.sighting_of_ref is some id
      sighting.attributes['sighting_of_ref_name'] = 'Commonly Used Port';
      sighting.attributes['name'] = 'Company X';
      sighting.attributes['ip'] = ip.ip || '123.23.2340';
      sighting.attributes['observed_data_refs_city'] = ip.city || 'Kyiv';
      sighting.attributes['observed_data_refs_country'] = ip.country || 'UA';
      // sighting.attributes.observed_data_refs[] holds ids
      sighting.attributes.observed_data_refs.push(ip.ip || '123.23.2340');
      sighting.attributes['sighting_of_ref_name_intrusion_set_group'] = 'APT3';
      this.service.recentSightings.unshift(sighting);
      if (i % 2) {
        const aip = this.ips.shift();
        const additionalSighting = new Sighting();
        additionalSighting.attributes.last_seen = new Date(new Date().setDate(new Date().getDate() - i));
        // additionalSighting.attributes.sighting_of_ref is some id
        additionalSighting.attributes['sighting_of_ref_name'] = 'Commonly Used Port';
        additionalSighting.attributes['name'] = 'Company X';
        additionalSighting.attributes['ip'] = aip.ip || '123.23.2340';
        additionalSighting.attributes['observed_data_refs_city'] = aip.city || 'Kyiv';
        additionalSighting.attributes['observed_data_refs_country'] = aip.country || 'UA';
        // additionalSighting.attributes.observed_data_refs[] holds ids
        additionalSighting.attributes.observed_data_refs.push(aip.ip || '123.23.2340');
        additionalSighting.attributes['sighting_of_ref_name_intrusion_set_group'] = 'APT3';
        this.service.recentSightings.unshift(additionalSighting);
        this.ips.push(aip);
      }
      this.ips.push(ip);
    }
  }

}
