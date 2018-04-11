import * as eventsActions from './events.actions';
import { Sighting } from '../../models';

export interface EventsState {
    sightingsGroup: any[];
    indicatorToApMap: any[];
    intrusionSetToApMap: any[];
    finishedLoading: boolean;
}

const genState = (state?: Partial<EventsState>) => {
    const tmp = {
        sightingsGroup: [],
        indicatorToApMap: [], 
        intrusionSetToApMap: [],
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
        case eventsActions.LOAD_DATA:
            return genState({
                ...state,
            });
        case eventsActions.SET_SIGHTINGS:
            return genState({
                ...state,
                sightingsGroup: [...action.payload],
            });
        case eventsActions.FINISHED_LOADING:
            return genState({
                ...state,
                finishedLoading: action.payload,
            });
        default:
            return state;
    }
}
