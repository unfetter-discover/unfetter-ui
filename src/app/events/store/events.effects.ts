import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_SIGHTINGS_DATA, SetSightings, FinishedLoading } from './events.actions';
import { OrganizationIdentity } from '../../models/user/organization-identity';
import { Sighting } from '../../models';
import { EventsService } from '../events.service';

@Injectable()
export class EventsEffects {

    public constructor(
        private actions$: Actions,
        protected eventsService: EventsService,
    ) { }

    @Effect()
    public fetchSightingsData = this.actions$
        .ofType(LOAD_SIGHTINGS_DATA)
        .pluck('payload')
        .switchMap((organizations: OrganizationIdentity[]) => this.eventsService.getAllSightingsByOrganization(organizations))
        .mergeMap((data: Sighting[]) => [new SetSightings(data), new FinishedLoading(true)]);
}
