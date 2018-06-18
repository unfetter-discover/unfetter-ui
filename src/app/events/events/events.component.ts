import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService, SightingsDataSource } from '../events.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../root-store/app.reducers';
import { EventsState } from '../store/events.reducers';
import { UserProfile } from '../../models/user/user-profile';
import { CleanSightingsData, StreamSightingIds, LoadData } from '../store/events.actions';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Sighting } from '../../models';
import { IPGeoService } from '../ipgeo.service';
import { fadeInOut } from '../../global/animations/fade-in-out';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [fadeInOut],
})
export class EventsComponent implements OnInit, OnDestroy {
  public filterOpen = true;
  private readonly subscriptions: Subscription[];
  private readonly ips = [];
  private sightingsGroup: any[];
  private indicatorToAp: any;
  private intrusionSetToAp: any;
  private identities: any[];
  private indicators: any[];
  private observedData: any[];
  private dummyValue: number;

  constructor(
    private userStore: Store<AppState>,
    private store: Store<EventsState>,
    public service: EventsService,
    public ipgeo: IPGeoService,
  ) {
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit() {
    this.dummyValue = Math.floor(Math.random() * 2);
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
      .filter((obj: any) => obj && Object.keys(obj).length > 0)
      .subscribe((obj: any) => {
        this.indicatorToAp = obj;
      },
        (err) => console.log(err));

    const sub3$ = this.store
      .select('sightingsGroup')
      .pluck('intrusionSetToAp')
      .distinctUntilChanged()
      .filter((obj: any) => obj && Object.keys(obj).length > 0)
      .subscribe((obj: any) => {
        this.intrusionSetToAp = obj;
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

    const sub5$ = this.store
      .select('sightingsGroup')
      .pluck('newSighting')
      .distinctUntilChanged()
      .subscribe((el: any) => {
        this.addSighting(el);
      },
        (err) => console.log(err));

    this.subscriptions.push(sub1$, sub2$, sub3$, sub4$, sub5$);
  }

  public addSighting(newSighting) {
    if (this.service.recentSightings) {
      this.transformSighting(newSighting);
      this.service.dataSource.addSighting(newSighting);
      let temp = this.service.recentSightings;
      temp.push(newSighting);
      this.service.recentSightings = temp;
      this.service.updateChart();
    }
  }

  /**
   * 
   */
  public makeIPs() {
    const subips$ = Observable
      .forkJoin([1, 2, 3].map(v4 => this.ipgeo.lookup(v4 === 3 ? '124.91.183.46'
          : [1, 2, 3, 4].map(() => Math.floor(Math.random() * 256)).join('.'))))
      .finally(() => {
        if (subips$) {
          subips$.unsubscribe();
        }
        this.transformSightings();
        this.service.finishedLoading = true;
      })
      .subscribe(resp => {
        console.log('event ipgeo output', resp);
        const ip = [].concat.apply([], resp).filter(r => r && r.success);
        if (ip) {
          this.ips.push(...ip);
        }
        while (this.ips.length < 2) {
          this.ips.push({});
        }
      });
  }

  /**
   * @returns string
   */
  getDummyIp(): string {
    // Default, matches default geo
    let dummyIp = '124.91.183.46';
    this.ipgeo.lookup(dummyIp);
    if (this.ips[this.dummyValue] && this.ips[this.dummyValue].city && this.ips[this.dummyValue].ip) {
      dummyIp = this.ips[this.dummyValue].ip;
    } else if (this.ips[Math.abs(this.dummyValue - 1)] && this.ips[Math.abs(this.dummyValue - 1)].ip) {
      dummyIp = this.ips[Math.abs(this.dummyValue - 1)].ip;
    }
    return dummyIp;
  }

  getDummyCity(): string {
    // Default, matches default Ip
    let dummyCity = 'Hangzhou';
    if (this.ips[this.dummyValue] && this.ips[this.dummyValue].city) {
      dummyCity = this.ips[this.dummyValue].city;
    } else if (this.ips[Math.abs(this.dummyValue - 1)] && this.ips[Math.abs(this.dummyValue - 1)].city) {
      dummyCity = this.ips[Math.abs(this.dummyValue - 1)].city;
    }
    return dummyCity;
  }

  /**
   * @returns string
   */
  getDummyCountry(): string {
    // Default, matches default Ip
    let dummyCountry = 'CN';
    if (this.ips[this.dummyValue] && this.ips[this.dummyValue].country) {
      dummyCountry = this.ips[this.dummyValue].country;
    } else if (this.ips[Math.abs(this.dummyValue - 1)] && this.ips[Math.abs(this.dummyValue - 1)].country) {
      dummyCountry = this.ips[Math.abs(this.dummyValue - 1)].country;
    }
    return dummyCountry;
  }

  /**
   * @param  {Sighting} sighting
   */
  public transformSighting(sighting: Sighting) {
    // dummy data
    this.dummyValue = Math.floor(Math.random() * 2);
    if (!sighting.attributes['x_unfetter_asset']) {
      sighting.attributes['x_unfetter_asset'] = {};
    }
    if (!sighting.attributes['x_unfetter_asset']['ip']) {
      sighting.attributes['x_unfetter_asset']['ip'] = this.getDummyIp();
    }
    if (!sighting.attributes['x_unfetter_asset']['hostname']) {
      sighting.attributes['x_unfetter_asset']['hostname'] = 'Generic.com Inc.';
    }
    sighting.attributes['observed_data_refs_city'] = this.getDummyCity();
    sighting.attributes['observed_data_refs_country'] = this.getDummyCountry();
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
    for (const indicator of this.indicators) {
      if (sightingOfRef === indicator.id) {
        sighting.attributes.sighting_of_ref = indicator.attributes.name;
        break;
      }
    }

    sighting.attributes['intrusionSet'] = this.getIntrusionSets(sightingOfRef);

    if (!sighting.attributes.observed_data_refs) {
      sighting.attributes.observed_data_refs = ['Unknown'];
    }
    sighting.attributes.observed_data_refs.forEach((observedData, index) => {
      sighting.attributes.observed_data_refs[index] = 'Unknown';
      for (const observed of this.observedData) {
        if (observedData === observed.id) {
          let allNames: string = '';
          for (const key of Object.keys(observed.attributes.objects)) {
            const obj = observed.attributes.objects[key];
            if (obj.type === 'user-account') {
              if (obj.user_id) {
                allNames += ' ' + obj.user_id;
              } else {
                allNames += ' ' + obj.type;
              }
            } else {
              if (obj.name) {
                allNames += ' ' + obj.name;
              } else {
                allNames += ' ' + obj.type;
              }
            }
          }
          sighting.attributes.observed_data_refs[index] = allNames;
          break;
        }
      }
    });

  }

  public getIntrusionSets(indicatorId): string[] {
    let intrusionSetNames: string[] = new Array<string>();
    let attackPatterns: any[] = [];
    if (indicatorId) {
      for (const key of Object.keys(this.indicatorToAp)) {
        if (indicatorId === key) {
          attackPatterns = this.indicatorToAp[key];
          break;
        }
      }
      for (const attackPattern of attackPatterns) {
        for (const key of Object.keys(this.intrusionSetToAp)) {
          if (attackPattern.id === key) {
            for (const set of this.intrusionSetToAp[key]) {
              intrusionSetNames.push(set.name);
            }
            break;
          }
        }
      }
    }
    return intrusionSetNames;
  }

  public transformSightings() {
    if (!this.sightingsGroup) {
      this.service.recentSightings = new Array<Sighting>();
      this.service.dataSource = new SightingsDataSource(this.service.recentSightings);
      this.identities = [];
      this.indicators = [];
      this.observedData = [];
    } else {
      this.service.recentSightings = this.sightingsGroup.filter((data: any) => data.attributes.type === 'sighting');
      this.identities = this.sightingsGroup.filter((data: any) => data.attributes.type === 'identity');
      this.indicators = this.sightingsGroup.filter((data: any) => data.attributes.type === 'indicator');
      this.observedData = this.sightingsGroup.filter((data: any) => data.attributes.type === 'observed-data');
      for (const sighting of this.service.recentSightings) {
        this.transformSighting(sighting);
        this.service.dataSource.addSighting(sighting);
      }
    }
  }
}
