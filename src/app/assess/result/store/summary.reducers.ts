import * as summaryActions from './summary.actions';
import * as fromApp from '../../root-store/app.reducers'
import { Indicator } from '../../models/stix/indicator';
import { Stix } from '../../models/stix/stix';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Assessment } from '../../../models/assess/assessment';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';

export interface SummaryState {
    summary: Assessment;
    summaries: Assessment[];
    finishedLoading: boolean;
    killChainDatum: RiskByKillChain;
    killChainData: RiskByKillChain[];
    finishedLoadingKillChainData: boolean;
};



const genState = (state?: Partial<SummaryState>) => {
    const tmp = {
        summary: new Assessment(),
        summaries: [],
        finishedLoading: false,
        killChainDatum: new RiskByKillChain(),
        killChainData: [],
        finishedLoadingKillChainData: false,
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: SummaryState = genState();

export function summaryReducer(state = initialState, action: summaryActions.SummaryActions): SummaryState {
    switch (action.type) {
        case summaryActions.LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA:
            return genState({
                ...state,
            });
        case summaryActions.LOAD_ASSESSMENT_SUMMARY_DATA:
            return genState({
                ...state,
            });
        case summaryActions.SET_ASSESSMENTS:
            return genState({
                ...state,
                summaries: [...action.payload],
            });
        case summaryActions.FINISHED_LOADING:
            return genState({
                ...state,
                finishedLoading: action.payload
            });
        case summaryActions.LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA:
            return genState({
                ...state,
            });
        case summaryActions.LOAD_RISK_PER_KILL_CHAIN_DATA:
            return genState({
                ...state,
            });
        case summaryActions.FINISHED_LOADING_KILL_CHAIN_DATA:
            return genState({
                ...state,
                finishedLoadingKillChainData: action.payload
            });
        case summaryActions.SET_KILL_CHAIN_DATA:
            return genState({
                ...state,
                killChainData: [...action.payload],
            });
        default:
            return state;
    }
}
