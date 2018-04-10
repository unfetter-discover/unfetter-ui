import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SetSightings, FinishedLoading, STREAM_SIGHTING_IDS, FETCH_SIGHTING_GROUP_BY_ID, FetchSightingGroupById, LOAD_DATA } from './events.actions';
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
        .ofType(LOAD_DATA)
        .switchMap(() => this.eventsService.getSightingGroup())
        .do((d) => console.log('~~~~', d.filter((dat) => dat.type === 'sighting')))
        .mergeMap((data: Sighting[]) => [new SetSightings(data.filter((dat) => dat.type === 'sighting')), new FinishedLoading(true)]);


    @Effect()
    public streamSightingIds = this.actions$
        .ofType(STREAM_SIGHTING_IDS)
        .do(() => console.log('Starting Events / streamSightingIds stream'))
        .switchMap(() => this.websocketService.connect(WSMessageTypes.STIXID))
        .pluck('body')
        .filter((stixNotificationBody: { id: string, type: string}) => stixNotificationBody.type === 'sighting')
        .pluck('id')
        .map((stixId: string) => new FetchSightingGroupById(stixId));

    @Effect({ dispatch: false })
    public fetchSightingGroupById = this.actions$
        .ofType(FETCH_SIGHTING_GROUP_BY_ID)
        .pluck('payload')
        .switchMap((sightingId: string) => this.eventsService.getSightingGroupById(sightingId))
        .do((objs) => console.log('Events / fetchSightingGroup debug output: ', objs));
    // TODO remove {dispatch:false}, mergeMap to actions to update various STIX objects
}
