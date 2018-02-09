import { Store } from '@ngrx/store';

import * as fromRoot from '../root-store/app.reducers';
import * as configActions from '../root-store/config/config.actions';
import * as indicatorSharingActions from '../indicator-sharing/store/indicator-sharing.actions';

// ~~~ root ~~~

export const mockConfig = {
    killChains: [
        {
            'name': 'mitre-attack',
            'phase_names': [
                'persistence',
                'privilege-escalation'
            ]
        },
        {
            'name': 'ctf',
            'phase_names': [
                'planning',
                'research'
            ],
            'stage_names': [
                'Preparation'
            ]
        }
    ]
};

export function makeRootMockStore(store: Store<fromRoot.AppState>) {
    store.dispatch(new configActions.AddConfig(mockConfig));
}

// ~~~ Indicator Sharing ~~~

export const mockIndicators = [
    {
        name: 'fake',
        pattern: '[process:pid=3]',
        labels: ['fake'],
        id: 'fake123'
    }
];

export const mockAttackPatterns = [
    {
        name: 'fake',
        id: 'fake123'
    }
];

export function makeMockIndicatorSharingStore(store: Store<fromRoot.AppState>) {
    store.dispatch(new indicatorSharingActions.SetIndicators(mockIndicators));
    store.dispatch(new indicatorSharingActions.SetAttackPatterns(mockAttackPatterns));
    store.dispatch(new indicatorSharingActions.FilterIndicators());
}
