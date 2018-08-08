import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import * as riskByAttackPatternActions from './riskbyattackpattern.actions';
import {RiskByAttackPatternActions} from './riskbyattackpattern.actions';

export interface RiskByAttackPatternState {
    failedToLoad: boolean;
    finishedLoading: boolean;
    riskByAttackPattern: RiskByAttack;
    riskByAttackPatterns: RiskByAttack[];
};

const genState = (state?: Partial<RiskByAttackPatternState>) => {
    const tmp = {
        failedToLoad: false,
        finishedLoading: false,
        riskByAttackPattern: new RiskByAttack(),
        riskByAttackPatterns: [],
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: RiskByAttackPatternState = genState();

export function riskByAttackPatternReducer(state = initialState, action: RiskByAttackPatternActions): RiskByAttackPatternState {
    switch (action.type) {
        case riskByAttackPatternActions.CLEAN_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA:
            return genState();
        case riskByAttackPatternActions.LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA:
            return genState({
                ...state,
            });
        case riskByAttackPatternActions.LOAD_RISK_BY_ATTACK_PATTERN_DATA:
            return genState({
                ...state,
            });
        case riskByAttackPatternActions.SET_RISK_BY_ATTACK_PATTERNS:
            return genState({
                ...state,
                riskByAttackPatterns: [...action.payload],
            });
        case riskByAttackPatternActions.FINISHED_LOADING:
            return genState({
                ...state,
                finishedLoading: action.payload,
                failedToLoad: false,
            });
        case riskByAttackPatternActions.FAILED_TO_LOAD:
            return genState({
                ...state,
                finishedLoading: true,
                failedToLoad: action.payload,
            })
        default:
            return state;
    }
}
