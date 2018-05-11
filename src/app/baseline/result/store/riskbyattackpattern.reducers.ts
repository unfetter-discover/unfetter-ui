import { RiskByAttack3 } from '../../../models/baseline/risk-by-attack3';
import * as riskByAttackPatternActions from './riskbyattackpattern.actions';

export interface RiskByAttackPatternState {
    riskByAttackPattern: RiskByAttack3;
    riskByAttackPatterns: RiskByAttack3[];
    finishedLoading: boolean;
};

const genState = (state?: Partial<RiskByAttackPatternState>) => {
    const tmp = {
        riskByAttackPattern: new RiskByAttack3(),
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
