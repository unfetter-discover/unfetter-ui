import * as utilityActions from './utility.actions';

// No interface or initial state defined since it's solely effects atm

export function utilityReducer(state = {}, action: utilityActions.UtilityActions) {
    console.log('Incoming action to utilityReducer: ', action);
    console.log('Current state: ', state);
    switch (action.type) {
        default:
            return state;
    }
}
