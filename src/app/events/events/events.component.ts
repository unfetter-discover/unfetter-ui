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
  private sightingsGroup: any[];
  private indicatorToAp: any[];
  private intrusionSetToAp: any[];
  private identities: any[];
  private indicators: any[];
  private observedData: any[];

  constructor(private userStore: Store<AppState>,
    private store: Store<EventsState>,
    public service: EventsService,
    public ipgeo: IPGeoService,
  ) {
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit() {
    this.sightingsGroup = undefined;
    this.identities = undefined;
    this.indicators = undefined;
    this.observedData = undefined;
    this.indicatorToAp = undefined;
    this.intrusionSetToAp = undefined;
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
      .pluck('indicatorToAp')
      .distinctUntilChanged()
      .filter((arr: any[]) => arr && arr.length > 0)
      .subscribe((arr: any[]) => {
        this.indicatorToAp = [...arr];
      },
        (err) => console.log(err));

    const sub3$ = this.store
      .select('sightingsGroup')
      .pluck('intrusionSetToAp')
      .distinctUntilChanged()
      .filter((arr: any[]) => arr && arr.length > 0)
      .subscribe((arr: any[]) => {
        this.intrusionSetToAp = [...arr];
      },
        (err) => console.log(err));

    const sub4$ = this.store
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
        this.makeIPs()
      }, (err) => console.log(err));

    this.subscriptions.push(sub1$, sub2$, sub3$, sub4$);
  }

  public makeIPs() {
    const subips$ = Observable
      .forkJoin([1, 2].map(v4 => this.ipgeo.lookup([1, 2, 3, 4].map(b => Math.floor(Math.random() * 256)).join('.'))))
      .finally(() => {
        if (subips$) {
          subips$.unsubscribe();
        }
        // console.log('after', this.ips);
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

  public transformSighting(sighting: Sighting) {
    // dummy data
    if (!sighting.attributes['ip']) {
      sighting.attributes['ip'] = this.ips[0].city ? this.ips[0].ip : this.ips[1].ip;
    }
    if (!sighting.attributes['name']) {
      sighting.attributes['name'] = 'Generic.com Inc.';
    }
    sighting.attributes['observed_data_refs_city'] = this.ips[0].city ? this.ips[0].city : this.ips[1].city;
    sighting.attributes['observed_data_refs_country'] = this.ips[0].country ? this.ips[0].country : this.ips[1].country;

    // end dummy data
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
    // console.log(`Ref: ${sightingOfRef}`);
    for (const indicator of this.indicators) {
      // console.log(`indicator: ${JSON.stringify(indicator)}`);
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
    // console.log(JSON.stringify(this.sightingsGroup));
    if (!this.sightingsGroup) {
      this.service.recentSightings = new Array<Sighting>();
      this.identities = [];
      this.indicators = [];
      this.observedData = [];
    } else {
      this.service.recentSightings = this.sightingsGroup.filter((data: any) => data.attributes.type === 'sighting');
      // console.log(`recentSightings initially ${JSON.stringify(this.service.recentSightings[0])}`);
      this.identities = this.sightingsGroup.filter((data: any) => data.attributes.type === 'identity');
      // console.log(`identities initially ${JSON.stringify(this.identities)}`);
      this.indicators = this.sightingsGroup.filter((data: any) => data.attributes.type === 'indicator');
      // console.log(`indicators initially ${JSON.stringify(this.indicators)}`);
      this.observedData = this.sightingsGroup.filter((data: any) => data.attributes.type === 'observed-data');
      // console.log(`observedData initially ${JSON.stringify(this.observedData)}`);
      for (const sighting of this.service.recentSightings) {
        this.transformSighting(sighting);
      }
      // console.log(`recentSightings after ${JSON.stringify(this.service.recentSightings)}`);
    }

    // for (let i = 0; i < 5; i++) {
    //   const ip = this.ips.shift();
    //   const sighting = new Sighting();
    //   sighting.attributes.last_seen = new Date(new Date().setDate(new Date().getDate() - i));
    //   // sighting.attributes.sighting_of_ref is some id
    //   sighting.attributes['sighting_of_ref'] = 'Commonly Used Port';
    //   sighting.attributes['name'] = 'Company X';
    //   sighting.attributes['ip'] = ip.ip || '123.23.2340';
    //   sighting.attributes['observed_data_refs_city'] = ip.city || 'Kyiv';
    //   sighting.attributes['observed_data_refs_country'] = ip.country || 'UA';
    //   // sighting.attributes.observed_data_refs[] holds ids
    //   sighting.attributes.observed_data_refs.push(ip.ip || '123.23.2340');
    //   sighting.attributes['sighting_of_ref_name_intrusion_set_group'] = 'APT3';
    //   this.service.recentSightings.unshift(sighting);
    //   if (i % 2) {
    //     const aip = this.ips.shift();
    //     const additionalSighting = new Sighting();
    //     additionalSighting.attributes.last_seen = new Date(new Date().setDate(new Date().getDate() - i));
    //     // additionalSighting.attributes.sighting_of_ref is some id
    //     additionalSighting.attributes['sighting_of_ref'] = 'Commonly Used Port';
    //     additionalSighting.attributes['name'] = 'Company X';
    //     additionalSighting.attributes['ip'] = aip.ip || '123.23.2340';
    //     additionalSighting.attributes['observed_data_refs_city'] = aip.city || 'Kyiv';
    //     additionalSighting.attributes['observed_data_refs_country'] = aip.country || 'UA';
    //     // additionalSighting.attributes.observed_data_refs[] holds ids
    //     additionalSighting.attributes.observed_data_refs.push(aip.ip || '123.23.2340');
    //     additionalSighting.attributes['sighting_of_ref_name_intrusion_set_group'] = 'APT3';
    //     this.service.recentSightings.unshift(additionalSighting);
    //     this.ips.push(aip);
    //   }
    // }
  }
}
