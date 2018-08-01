import { Tactic, TacticChain } from '../../global/components/tactics-pane/tactics.model';
import { Dictionary } from '../../models/json/dictionary';
import * as configActions from './config.actions';

export interface ConfigState {
    configurations: any,
    tacticsChains?: Dictionary<TacticChain>,
    tactics?: Tactic[],
}

export const initialState: ConfigState = {
    configurations: {},
    tactics: [],
}

export function configReducer(state = initialState, action: configActions.ConfigActions) {

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
            const configCopy = { ...state.configurations };
            delete configCopy[action.payload];
            return {
                ...state,
                configurations: configCopy
            };

        case configActions.CLEAR_CONFIG:
            return {
                ...state,
                ...initialState
            };

        default:
            return state;

    }    

}
