import * as eventsActions from './events.actions';
import { Sighting } from '../../models';

export interface EventsState {
    sightings: Sighting[];
    finishedLoading: boolean;
}

const genState = (state?: Partial<EventsState>) => {
    const tmp = {
        sightings: new Array<Sighting>(),
        finishedLoading: false,
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: EventsState = genState();

export function eventsReducer(state = initialState, action: eventsActions.EventsActions): EventsState {
    switch (action.type) {
        case eventsActions.CLEAN_SIGHTINGS_DATA:
            return genState();
        case eventsActions.LOAD_SIGHTINGS_DATA:
            return genState({
                ...state,
            });
        case eventsActions.SET_SIGHTINGS:
            return genState({
                ...state,
                sightings: [...action.payload],
            });
        case eventsActions.FINISHED_LOADING:
            return genState({
                ...state,
                finishedLoading: action.payload
            });
        default:
            return state;
    }
}
