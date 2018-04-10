import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericApi } from '../core/services/genericapi.service';
import { OrganizationIdentity } from '../models/user/organization-identity';
import { Sighting } from '../models';
import { Constance } from '../utils/constance';
import { JsonApiData } from '../models/json/jsonapi-data';

@Injectable()
export class EventsService {
  public readonly eventsBaseUrl = Constance.SIGHTING_URL;
  public readonly indicatorsUrl = Constance.INDICATOR_URL;
  public recentSightings: Sighting[];
  public finishedLoading: boolean;
  
  constructor(
    private genericApi: GenericApi,
  ) { }

      /**
     * @description
     * @param {string} url
     * @return {Observable<T>}
     */
    public getAs<T>(url = ''): Observable<T|T[]> {
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

//   TODO if using getSightingGroup, delete this
  /**
  * @description
  * @param {string} id
  * @return {Observable}
  */
  public getAllSightingsByOrganization(organizations: OrganizationIdentity[]): Observable<Sighting[]> {
    if (!organizations) {
      return Observable.empty();
    }
    // TODO filter by org 
    const url = `${this.eventsBaseUrl}`;
    return this.genericApi.getAs<Sighting[]>(url);
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
}
