import { ActionReducerMap } from '@ngrx/store';
import { reducers } from '../../root-store/app.reducers';
import { ThreatFeatureState, threatReducer } from '../store/threat.reducers';

const mockThreatReducer: ActionReducerMap<ThreatFeatureState> = {
    ...reducers,
    threat: threatReducer
}

export default mockThreatReducer;
