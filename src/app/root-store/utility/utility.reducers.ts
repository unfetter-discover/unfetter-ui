import * as utilityActions from './utility.actions';

// No interface or initial state defined since it's solely effects atm

export function utilityReducer(state = {}, action: utilityActions.UtilityActions) {
    switch (action.type) {
        default:
            return state;
    }
}
