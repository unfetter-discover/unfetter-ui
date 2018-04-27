import { RiskByAttack } from '../../../../models/assess/risk-by-attack';
import * as riskByAttackPatternActions from './riskbyattackpattern.actions';

export interface RiskByAttackPatternState {
    riskByAttackPattern: RiskByAttack;
    riskByAttackPatterns: RiskByAttack[];
    finishedLoading: boolean;
};

const genState = (state?: Partial<RiskByAttackPatternState>) => {
    const tmp = {
        riskByAttackPattern: new RiskByAttack(),
        riskByAttackPatterns: [],
        finishedLoading: false,
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: RiskByAttackPatternState = genState();

export function riskByAttackPatternReducer(state = initialState, action: riskByAttackPatternActions.RiskByAttackPatternActions): RiskByAttackPatternState {
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
                finishedLoading: action.payload
            });
        default:
            return state;
    }
}
