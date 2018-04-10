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

}
