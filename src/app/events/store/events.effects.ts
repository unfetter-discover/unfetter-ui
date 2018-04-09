import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_SIGHTINGS_DATA, SetSightings, FinishedLoading, STREAM_SIGHTING_IDS, FetchSightingGroup, FETCH_SIGHTING_GROUP } from './events.actions';
import { OrganizationIdentity } from '../../models/user/organization-identity';
import { Sighting } from '../../models';
import { EventsService } from '../events.service';
import { WebsocketService } from '../../core/services/web-socket.service';
import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';

@Injectable()
export class EventsEffects {

    public constructor(
        private actions$: Actions,
        protected eventsService: EventsService,
        private websocketService: WebsocketService
    ) { }

    @Effect()
    public fetchSightingsData = this.actions$
        .ofType(LOAD_SIGHTINGS_DATA)
        .pluck('payload')
        .switchMap((organizations: OrganizationIdentity[]) => this.eventsService.getAllSightingsByOrganization(organizations))
        .mergeMap((data: Sighting[]) => [new SetSightings(data), new FinishedLoading(true)]);


    @Effect()
    public streamSightingIds = this.actions$
        .ofType(STREAM_SIGHTING_IDS)
        .do(() => console.log('Starting Events / streamSightingIds stream'))
        .switchMap(() => this.websocketService.connect(WSMessageTypes.STIXID))
        .pluck('body')
        .filter((stixNotificationBody: { id: string, type: string}) => stixNotificationBody.type === 'sighting')
        .pluck('id')
        .map((stixId: string) => new FetchSightingGroup(stixId));

    @Effect({ dispatch: false })
    public fetchSightingGroup = this.actions$
        .ofType(FETCH_SIGHTING_GROUP)
        .pluck('payload')
        .switchMap((sightingId: string) => this.eventsService.getSightingGroup(sightingId))
        .do((objs) => console.log('Events / fetchSightingGroup debug output: ', objs));
    // TODO remove {dispatch:false}, mergeMap to actions to update various STIX objects
}
