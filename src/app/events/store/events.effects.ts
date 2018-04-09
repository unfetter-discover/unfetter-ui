import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_SIGHTINGS_DATA, SetSightings, FinishedLoading, STREAM_SIGHTING_IDS } from './events.actions';
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


    @Effect({ dispatch: false })
    public streamSightingIds = this.actions$
        .ofType(STREAM_SIGHTING_IDS)
        .do(() => console.log('Starting Events / streamSightingIds stream'))
        .switchMap(() => this.websocketService.connect(WSMessageTypes.STIXID))
        .pluck('body')
        .filter((stixNotificationBody: { id: string, type: string}) => stixNotificationBody.type === 'sighting')
        .pluck('id')
        // TODO remove { dispath: false }, switchmap to a handler for the STIX ID
        .do((stix) => console.log('Incoming ID to Events / streamSightingIds effect: ', stix));
}
