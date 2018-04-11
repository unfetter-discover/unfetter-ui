import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../root-store/app.reducers';
import { EventsState } from '../store/events.reducers';
import { UserProfile } from '../../models/user/user-profile';
import { CleanSightingsData, StreamSightingIds, LoadData } from '../store/events.actions';
import { Subscription } from 'rxjs/Subscription';
import { Sighting } from '../../models';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[];
  private sightingsGroup: any[];
  private identities: any[];
  private indicators: any[];
  private observedData: any[];

  constructor(private userStore: Store<AppState>,
    private store: Store<EventsState>,
    public service: EventsService) {
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit() {
    this.sightingsGroup = undefined;
    this.identities = undefined;
    this.indicators = undefined;
    this.observedData = undefined;
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
      .select('sightingsGroup')
      .pluck('sightingsGroup')
      .distinctUntilChanged()
      .filter((arr: any[]) => arr && arr.length > 0)
      .subscribe((arr: any[]) => {
        this.sightingsGroup = [...arr];
      },
        (err) => console.log(err));

    const sub2$ = this.store
      .select('sightingsGroup')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .filter((el) => el === true)
      .subscribe((done: boolean) => {
        if (this.sightingsGroup === undefined) {
          // fetching the summary failed, set all flags to done
          this.service.finishedLoading = done;
          return;
        }
        this.service.finishedLoading = done;
        this.transformSightings()
      }, (err) => console.log(err));

    this.subscriptions.push(sub1$, sub2$);
  }

  public transformSighting(sighting: Sighting) {
    if (!sighting.attributes.where_sighted_refs) {
      sighting.attributes['where_sighted_refs'] = ['Unknown'];
    }
    sighting.attributes.where_sighted_refs.forEach((whereSighted, index) => {
      sighting.attributes.where_sighted_refs[index] = 'Unknown';
      for (const identity of this.identities) {
        if (whereSighted === identity.id) {
          sighting.attributes.where_sighted_refs[index] = identity.attributes.name;
          break;
        }
      }
    });

    const sightingOfRef = sighting.attributes.sighting_of_ref;
    sighting.attributes.sighting_of_ref = 'Unknown';
    console.log(`Ref: ${sightingOfRef}`);
    for (const indicator of this.indicators) {
      console.log(`indicator: ${JSON.stringify(indicator)}`);
      if (sightingOfRef === indicator.id) {
        sighting.attributes.sighting_of_ref = indicator.attributes.name;
        break;
      }
    }

    if (!sighting.attributes.observed_data_refs) {
      sighting.attributes.observed_data_refs = ['Unknown'];
    }
    sighting.attributes.observed_data_refs.forEach((observedData, index) => {
      sighting.attributes.observed_data_refs[index] = 'Unknown';
      for (const observed of this.observedData) {
        if (observedData === observed.id) {
          let allNames: string = '';
          for (const key of Object.keys(observed.attributes.objects)) {
            allNames += ' ' + observed.attributes.objects[key].name;
          }
          sighting.attributes.observed_data_refs[index] = allNames;
          break;
        }
      }
    });
  }

  public transformSightings() {
    console.log(JSON.stringify(this.sightingsGroup));
    if (!this.sightingsGroup) {
      this.service.recentSightings = new Array<Sighting>();
      this.identities = [];
      this.indicators = [];
      this.observedData = [];
    } else {
      this.service.recentSightings = this.sightingsGroup.filter((data: any) => data.attributes.type === 'sighting');
      console.log(`recentSightings initially ${JSON.stringify(this.service.recentSightings[0])}`);
      this.identities = this.sightingsGroup.filter((data: any) => data.attributes.type === 'identity');
      console.log(`identities initially ${JSON.stringify(this.identities)}`);
      this.indicators = this.sightingsGroup.filter((data: any) => data.attributes.type === 'indicator');
      console.log(`indicators initially ${JSON.stringify(this.indicators)}`);
      this.observedData = this.sightingsGroup.filter((data: any) => data.attributes.type === 'observed-data');
      console.log(`observedData initially ${JSON.stringify(this.observedData)}`);
      for (const sighting of this.service.recentSightings) {
        this.transformSighting(sighting);
      }
      console.log(`recentSightings after ${JSON.stringify(this.service.recentSightings)}`);
    }


    // dummy data
    /* for (let i = 0; i < 40; i++) {
      const sighting = new Sighting();
      sighting.attributes.last_seen = new Date(new Date().setDate(new Date().getDate() - i));
      // sighting.attributes.sighting_of_ref is some id
      sighting.attributes['sighting_of_ref'] = 'Commonly Used Port';
      sighting.attributes['name'] = 'Company X';
      sighting.attributes['ip'] = '123.23.2340';
      sighting.attributes['observed_data_refs_city'] = 'Kyiv';
      sighting.attributes['observed_data_refs_country'] = 'UA';
      // sighting.attributes.observed_data_refs[] holds ids
      sighting.attributes.observed_data_refs.push('123.23.2340');
      sighting.attributes['sighting_of_ref_name_intrusion_set_group'] = 'APT3';
      this.service.recentSightings.unshift(sighting);
      if (i % 2) {
        const additionalSighting = new Sighting();
        additionalSighting.attributes.last_seen = new Date(new Date().setDate(new Date().getDate() - i));
        // additionalSighting.attributes.sighting_of_ref is some id
        additionalSighting.attributes['sighting_of_ref'] = 'Commonly Used Port';
        additionalSighting.attributes['name'] = 'Company X';
        additionalSighting.attributes['ip'] = '123.23.2340';
        additionalSighting.attributes['observed_data_refs_city'] = 'Kyiv';
        additionalSighting.attributes['observed_data_refs_country'] = 'UA';
        // additionalSighting.attributes.observed_data_refs[] holds ids
        additionalSighting.attributes.observed_data_refs.push('123.23.2340');
        additionalSighting.attributes['sighting_of_ref_name_intrusion_set_group'] = 'APT3';
        this.service.recentSightings.unshift(additionalSighting);
      }
    } */
  }
}
