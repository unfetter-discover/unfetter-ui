import { DataSource } from '@angular/cdk/table';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { GenericApi } from '../core/services/genericapi.service';
import { ChartData } from '../global/models/chart-data';
import { Sighting } from '../models';
import { JsonApiData } from '../models/json/jsonapi-data';
import { OrganizationIdentity } from '../models/user/organization-identity';
import { Constance } from '../utils/constance';

export class SightingsData {
    dataChange: BehaviorSubject<Sighting[]> = new BehaviorSubject<Sighting[]>([]);
    get data(): Sighting[] { return this.dataChange.value; }

    constructor(sightings: Sighting[]) {
        if (sightings) {
            for (const sighting of sightings) {
                this.addSighting(sighting);
            }
        }
    }

    addSighting(newSighting: Sighting) {
        const copiedData = this.data.slice();
        copiedData.push(newSighting);
        this.dataChange.next(copiedData);
    }
}

export class SightingsDataSource extends DataSource<any> {
    constructor(private sightingsData: SightingsData) {
        super();
    }

    connect(): Observable<Sighting[]> {
        return this.sightingsData.dataChange;
    }

    disconnect() { }
}

@Injectable()
export class EventsService {
    readonly BASE_TEN: number;
    public readonly eventsBaseUrl = Constance.SIGHTING_URL;
    public readonly indicatorsUrl = Constance.INDICATOR_URL;
    public readonly attackPatternsUrl = Constance.ATTACK_PATTERN_URL;
    public recentSightings: Sighting[];
    public finishedLoading: boolean;
    public dataStore = new SightingsData(this.recentSightings);
    public dataSource: SightingsDataSource | null;
    public readonly barChartData: ChartData[];
    public barChartLabels: string[];
    public daysOfDataValue: string;

    public set daysOfData(newSelectedRange: string) {
        this.daysOfDataValue = newSelectedRange;
        this.updateChart();
    }

    public get daysOfData(): string {
        return this.daysOfDataValue;
    }

    constructor(
        private genericApi: GenericApi,
        private datePipe: DatePipe
    ) {
        this.BASE_TEN = 10;
        this.dataSource = new SightingsDataSource(this.dataStore);
        this.barChartData = [
            {
                data: [],
                label: 'Detected Threats',
                borderWidth: 0,
            },
        ]
    }

    /**
   * @description
   * @param {string} url
   * @return {Observable<T>}
   */
    public getAs<T>(url = ''): Observable<T | T[]> {
        if (!url) {
            return Observable.empty();
        }

        return this.genericApi
            .getAs<JsonApiData<T>>(url)
            .map((data) => {
                if (Array.isArray(data)) {
                    return data.map((el) => el.attributes);
                } else {
                    return data.attributes;
                }
            });
    }

    /**
     * @param  {string} sightingId
     * @return {Observable} various STIX types
     * @description Gets a sighting by ID and all objects referenced by it, 
     * as well as the identities that created the referenced objects.
     */
    public getSightingGroupById(sightingId: string): Observable<any> {
        return this.genericApi.get(`${this.eventsBaseUrl}/group/${sightingId}`);
    }

    /**
     * @return {Observable} various STIX types
     * @description Gets all sightings nd all objects referenced by them, 
     * as well as the identities that created the referenced objects.
     */
    public getSightingGroup(): Observable<any> {
        return this.genericApi.get(`${this.eventsBaseUrl}/group`);
    }

    /**
     * @return {Observable} various STIX types
     * @description Gives an object with an indicator IDs as the properties that point to a list of attack patterns
     */
    public getAttackPatternsByIndicator(): Observable<any> {
        return this.genericApi.get(`${this.indicatorsUrl}/attack-patterns-by-indicator`);
    }

    /**
     * @return {Observable} various STIX types
     * @description Gives an object with an attack pattern IDs as the properties that point to a list of intrusion sets
     */
    public getInstrusionSetsByAttackPattern(): Observable<any> {
        return this.genericApi.get(`${this.attackPatternsUrl}/intrusion-sets-by-attack-pattern`);
    }

    updateChart() {
        let earliest = new Date(new Date().setDate(new Date().getDate() - parseInt(this.daysOfData, this.BASE_TEN)));
        let inRangeSightings = this.recentSightings.reduce((result, sighting) => {
            if (new Date(sighting.attributes.last_seen) >= earliest) {
                result.push(sighting)
            }
            return result;
        }, []);
        inRangeSightings.sort(function (a, b) { return (a.attributes.last_seen > b.attributes.last_seen) ? 1 : ((b.attributes.last_seen > a.attributes.last_seen) ? -1 : 0); });
        let nonUniqueDateSightings = inRangeSightings.map((sighting) => this.datePipe.transform(sighting.attributes.last_seen, 'MMM dd'));
        let uniqueDateSightings = nonUniqueDateSightings.reduce((a, b) => (a[b] = a[b] + 1 || 1) && a, []);
        this.barChartLabels = Object.keys(uniqueDateSightings);
        this.barChartData[0].data = Object.values(uniqueDateSightings);
    }
}
