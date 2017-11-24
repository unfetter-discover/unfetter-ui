import * as configActions from './config.actions';

export interface ConfigState {
    configurations: any
}

const initialState: ConfigState = {
    configurations: {}
}

export function configReducer(state = initialState, action: configActions.ConfigActions) {
    console.log('Incoming action to configReducer: ', action);
    console.log('Current state: ', state);
    switch (action.type) {
        case configActions.ADD_CONFIG:
            return {
                ...state,
                configurations: {
                    ...state.configurations,
                    ...action.payload
                }
            };
        case configActions.UPDATE_CONFIG:
            return {
                ...state,
                configurations: {
                    ...state.configurations,
                    ...action.payload
                }
            };
        case configActions.DELETE_CONFIG:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }    
}
