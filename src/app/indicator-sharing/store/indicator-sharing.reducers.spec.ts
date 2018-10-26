import { IndicatorSharingState, initialState, indicatorSharingReducer, initialSearchParameters } from './indicator-sharing.reducers';
import * as actions from './indicator-sharing.actions'
import { SortTypes } from '../models/sort-types.enum';
import { SearchParameters } from '../models/search-parameters';
import { ActionsSubject } from '@ngrx/store';

describe('indicatorSharingReducer', () => {
    let mockInitialState: IndicatorSharingState;
    let mockState: IndicatorSharingState;

    let mockIndicators: any[];
    let mockSensors: any[];
    let mockAttackPatterns: any[];
    let mockIdentities: any[];

    let mockInitialSearchParameters: SearchParameters;
    let mockSearchParameters: SearchParameters;

    beforeEach(() => {
        mockInitialState = initialState;

        mockIndicators = [
            {
                id: '1234',
                name: 'foo',
                pattern: 'foo',
                created_by_ref: 'identity--1234'
            },
            {
                id: '5678',
                name: 'bar',
                pattern: 'bar',
                created_by_ref: 'identity--5678'
            }
        ];

        mockSensors = [
            {
                id: '1234',
                name: 'foo',
                created_by_ref: 'identity--1234'
            },
            {
                id: '5678',
                name: 'bar',
                created_by_ref: 'identity--5678'
            }
        ];

        mockAttackPatterns = [
            {
                id: '1234',
                name: 'foo',
                created_by_ref: 'identity--1234'
            },
            {
                id: '5678',
                name: 'bar',
                created_by_ref: 'identity--5678'
            }
        ];

        mockIdentities = [
            {
                id: '1234',
                name: 'foo'
            },
            {
                id: '5678',
                name: 'bar'
            }
        ];

        mockInitialSearchParameters = initialSearchParameters;

        mockSearchParameters = {
            ...initialSearchParameters,
            indicatorName: 'foo'
        };

        mockState = {
            ...mockInitialState,
            indicators: [...mockIndicators],
            filteredIndicators: [...mockIndicators],
            displayedIndicators: [...mockIndicators],
            sensors: [...mockSensors],
            identities: [...mockIdentities],
            searchParameters: { ...mockSearchParameters }
        };
    });

    it('should return initial state', () => {
        expect(indicatorSharingReducer(undefined, {} as actions.IndicatorSharingActions)).toBe(mockInitialState);
    });

    it('should set indicators', () => {
        const reducedState = indicatorSharingReducer(undefined, new actions.SetIndicators(mockIndicators));
        expect(reducedState).not.toEqual(initialState);
        expect(reducedState.indicators).toEqual(mockIndicators);
        expect(reducedState.filteredIndicators).toEqual(mockIndicators);
        expect(reducedState.displayedIndicators).toEqual(mockIndicators);
    });

    it('should set filtered indicators', () => {
        const reducedState = indicatorSharingReducer(mockState, new actions.SetFilteredIndicators([mockIndicators[0]]));
        expect(reducedState).not.toEqual(initialState);
        expect(reducedState.indicators).toEqual(mockIndicators);
        expect(reducedState.filteredIndicators).toEqual([mockIndicators[0]]);
        expect(reducedState.displayedIndicators).toEqual([mockIndicators[0]]);
    });

    it('should set indicator count', () => {
        const reducedState = indicatorSharingReducer(undefined, new actions.SetTotalIndicatorCount(50));
        expect(reducedState).not.toEqual(initialState);
        expect(reducedState.totalIndicatorCount).toEqual(50);
    });
    
    it('should set serverCallComplete to false during fetch data', () => {
        const altMockState = {
            ...mockState,
            serverCallComplete: true
        };
        const reducedState = indicatorSharingReducer(altMockState, new actions.FetchData());
        expect(reducedState.serverCallComplete).toBeFalsy();
    });

    it('should set sortBy', () => {
        const reducedState = indicatorSharingReducer(undefined, new actions.SetSortBy(SortTypes.COMMENTS));
        expect(reducedState.sortBy).toBe(SortTypes.COMMENTS);
    });

    it('should addIndicator', () => {
        const reducedState = indicatorSharingReducer(undefined, new actions.AddIndicator(mockIndicators[0]));
        expect(reducedState.indicators).toEqual([mockIndicators[0]])
        expect(reducedState.totalIndicatorCount).toBe(1);
    });

    it('should update indicator', () => {
        const payload = {
            ...mockIndicators[0],
            name: 'updated'
        };
        const reducedState = indicatorSharingReducer(mockState, new actions.UpdateIndicator(payload));
        expect(reducedState.indicators[0]).toEqual(payload);
        expect(reducedState.filteredIndicators[0]).toEqual(payload);
        expect(reducedState.displayedIndicators[0]).toEqual(payload);
    });

    it('should delete indicator', () => {
        const reducedState = indicatorSharingReducer(mockState, new actions.DeleteIndicator(mockIndicators[0].id));
        expect(reducedState.indicators.length).not.toBe(mockIndicators.length);
        expect(reducedState.indicators[0]).not.toBe(mockIndicators[0]);
        expect(reducedState.filteredIndicators[0]).not.toBe(mockIndicators[0]);
        expect(reducedState.displayedIndicators[0]).not.toBe(mockIndicators[0]);
    });

    it('should set sensors', () => {
        const reducedState = indicatorSharingReducer(initialState, new actions.SetSensors(mockSensors));
        expect(reducedState).not.toEqual(initialState);
        expect(reducedState.sensors.length).toBe(mockSensors.length);
        expect(reducedState.sensors[0]).toEqual(mockSensors[0]);
    });

    it('should set identities', () => {
        const reducedState = indicatorSharingReducer(initialState, new actions.SetIdentities(mockIdentities));
        expect(reducedState).not.toEqual(initialState);
        expect(reducedState.identities).toEqual(mockIdentities);
    });

    it('should set indicator-to-ap-map', () => {
        const payload = {
            1234: [...mockAttackPatterns]
        };
        const reducedState = indicatorSharingReducer(initialState, new actions.SetIndicatorToApMap(payload));
        expect(reducedState).not.toEqual(initialState);
        expect(reducedState.indicatorToApMap).toEqual(payload);
    });

    it('should set search parameters', () => {
        const payload = { indicatorName: 'bob' };
        const expected = { ...mockInitialSearchParameters, ...payload };
        const reducedState = indicatorSharingReducer(initialState, new actions.SetSearchParameters(payload));
        expect(reducedState).not.toEqual(initialState);
        expect(reducedState.searchParameters).not.toEqual(mockInitialSearchParameters);
        expect(reducedState.searchParameters).toEqual(expected);
    });

    it('should clear search parameters', () => {
        const reducedState = indicatorSharingReducer(mockState, new actions.ClearSearchParameters());
        expect(reducedState.searchParameters).toEqual(mockInitialSearchParameters);
    });

    it('should clear data', () => {
        const reducedState = indicatorSharingReducer(mockState, new actions.ClearData());
        expect(reducedState).toEqual(mockInitialState);
    });

    it('should update social (COMMENT)', () => {
        const payload = {
            stixId: mockIndicators[0].id,
            type: 'COMMENT',
            body: {
                comment: 'foo'
            }
        };
        const reducedState = indicatorSharingReducer(mockState, new actions.UpdateSocial(payload));
        expect(reducedState.indicators[0].metaProperties).toBeDefined();
        expect(reducedState.indicators[0].metaProperties.comments).toBeDefined();
        expect(reducedState.indicators[0].metaProperties.comments[0]).toEqual(payload.body);
    });

    it('should set serverCallComplete', () => {
        const reducedState = indicatorSharingReducer(mockState, new actions.SetServerCallComplete(true));
        expect(reducedState).not.toEqual(initialState);
        expect(reducedState.serverCallComplete).toBe(true);
    });
});
