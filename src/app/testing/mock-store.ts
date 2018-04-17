import { Store } from '@ngrx/store';

import * as fromRoot from '../root-store/app.reducers';
import * as fromIndicatorSharing from '../indicator-sharing/store/indicator-sharing.reducers';
import * as configActions from '../root-store/config/config.actions';
import * as indicatorSharingActions from '../indicator-sharing/store/indicator-sharing.actions';
import * as userActions from '../root-store/users/user.actions';
import { testUser } from './test-user';

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
    ],
    openVocab: {
        'indicator-label-ov': {
            enum: [ 'test' ]
        },
        'identity-label-ov': {
            enum: [ 'test' ]
        },
        'malware-label-ov': {
            enum: [ 'test' ]
        },
        'report-label-ov': {
            enum: [ 'test' ]
        },
        'threat-actor-label-ov': {
            enum: [ 'test' ]
        },
        'tool-label-ov': {
            enum: [ 'test' ]
        },
    }
};

export function makeRootMockStore(store: Store<fromRoot.AppState>) {
    store.dispatch(new configActions.AddConfig(mockConfig));
    store.dispatch(new userActions.LoginUser(testUser));
}

// ~~~ Indicator Sharing ~~~

export const mockIndicators = [
    {
        name: 'fake',
        pattern: '[process:pid=3]',
        labels: ['fake'],
        id: 'fake123',
        metaProperties: {
            comments: [ {} ]
        }
    },
    {
        name: 'mfake',
        pattern: '[process:pid=3]',
        labels: ['mfake'],
        id: 'mfake123',
        metaProperties: {
            comments: [ {}, {} ]
        }
    },
    {
        name: 'zfake',
        pattern: '[process:pid=3]',
        labels: ['zfake'],
        id: 'zfake123',
        metaProperties: {}
    }
];

export const mockAttackPatterns = [
    { name: 'AP1', id: 'ap1' },
    { name: 'AP2', id: 'ap2' },
];

export const indicatorToApMap = {
    'fake123': [{id: mockAttackPatterns[0].id, name: mockAttackPatterns[0].name}],
    'mfake123': [
        {id: mockAttackPatterns[0].id, name: mockAttackPatterns[0].name},
        {id: mockAttackPatterns[1].id, name: mockAttackPatterns[1].name},
    ],
    'zfake123': [{id: mockAttackPatterns[1].id, name: mockAttackPatterns[1].name}],
};

export function makeMockIndicatorSharingStore(store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>) {
    store.dispatch(new indicatorSharingActions.SetIndicators(mockIndicators));
    store.dispatch(new indicatorSharingActions.SetAttackPatterns(mockAttackPatterns));
    store.dispatch(new indicatorSharingActions.SetIndicatorToApMap(indicatorToApMap));
}
