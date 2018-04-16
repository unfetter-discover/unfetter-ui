import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from '../../core/services/web-socket.service';
import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { EventsService } from '../events.service';
import { AddSighting, FETCH_SIGHTING_GROUP_BY_ID, FetchSightingGroupById, FinishedLoading, LOAD_DATA, STREAM_SIGHTING_IDS, SetIndicatorToAp, SetIntrusionSetToAp, SetSightings } from './events.actions';

@Injectable()
export class EventsEffects {

    public constructor(
        private actions$: Actions,
        protected eventsService: EventsService,
        private websocketService: WebsocketService
    ) { }

    @Effect()
    public fetchData = this.actions$
        .ofType(LOAD_DATA)
        .switchMap(() => Observable.forkJoin(
            this.eventsService.getSightingGroup(),
            this.eventsService.getAttackPatternsByIndicator()
                .map((res) => RxjsHelpers.relationshipArrayToObject(res.attributes, 'attackPatterns')),
            this.eventsService.getInstrusionSetsByAttackPattern()
                .map((res) => RxjsHelpers.relationshipArrayToObject(res.attributes, 'intrusionSets'))
        ))
        .do((data) => console.log('Events / fetchData debug output: ', data))
        // TODO create additional actions / filters to handle other types of objects
        .mergeMap(([sightingsGroup, indicatorToAp, intrusionSetToAp]: [any, any, any]) => [
            new SetSightings(sightingsGroup),
            new SetIndicatorToAp(indicatorToAp),
            new SetIntrusionSetToAp(intrusionSetToAp),
            new FinishedLoading(true)
        ]);


    @Effect()
    public streamSightingIds = this.actions$
        .ofType(STREAM_SIGHTING_IDS)
        .do(() => console.log('Starting Events / streamSightingIds stream'))
        .switchMap(() => this.websocketService.connect(WSMessageTypes.STIXID))
        .pluck('body')
        .filter((stixNotificationBody: { id: string, type: string }) => stixNotificationBody.type === 'sighting')
        .pluck('id')
        .map((stixId: string) => new FetchSightingGroupById(stixId));

    @Effect()
    public fetchSightingGroupById = this.actions$
        .ofType(FETCH_SIGHTING_GROUP_BY_ID)
        .pluck('payload')
        .switchMap((sightingId: string) => this.eventsService.getSightingGroupById(sightingId))
        .do((objs) => console.log('Events / fetchSightingGroup debug output: ', objs))
        .mergeMap(([newSighting]: [any]) => [
            new AddSighting(newSighting),
        ]);
}
