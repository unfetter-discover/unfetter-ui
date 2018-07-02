import { AttackPatternMockFactory } from 'stix/unfetter/attack-pattern.mock';
import { FullAssessmentGroup } from '../full/group/models/full-assessment-group';
import * as actions from './full-result.actions';
import { fullAssessmentResultReducer, FullAssessmentResultState, genGroupState, genState } from './full-result.reducers';

describe('assessment v3 - full result reducer spec', () => {

    let initialState: FullAssessmentResultState = null;
    let initialGroupDataState: FullAssessmentGroup = null;

    beforeEach(() => {
        initialState = genState();
        initialGroupDataState = genGroupState();
    });

    it('should return initial state', () => {
        expect(initialGroupDataState).toBeDefined();
        expect(initialState).toBeDefined();
        expect(initialState.group).toBeDefined();
        expect(initialState.fullAssessment).toBeDefined();
        expect(initialState.finishedLoading).toBe(false);
        expect(initialState.failedToLoad).toBe(false);
    });

    it('should track finished loading', () => {
        const state = fullAssessmentResultReducer(initialState, new actions.FinishedLoading(true));
        expect(state).toBeDefined();
        expect(state.finishedLoading).toBe(true);
        expect(state.failedToLoad).toBe(false);
    });

    it('should track failed to load', () => {
        const state = fullAssessmentResultReducer(initialState, new actions.FailedToLoad(true));
        expect(state).toBeDefined();
        expect(state.finishedLoading).toBe(true);
        expect(state.failedToLoad).toBe(true);
    });

    it('should respond to loading an assessment by id', () => {
        const state = fullAssessmentResultReducer(initialState, new actions.LoadAssessmentById('123'));
        expect(state).toBeDefined();
    });

    it('should track the group and current attack pattern', () => {
        const currentAttackPattern = AttackPatternMockFactory.mockOne();
        initialState.group.currentAttackPattern = currentAttackPattern;
        initialState.group.finishedLoadingGroupData = true;
        const state = fullAssessmentResultReducer(initialState, new actions.SetGroupCurrentAttackPattern({ currentAttackPattern }));
        expect(state).toBeDefined();
        expect(state.group).toBeDefined();
        expect(state.group.currentAttackPattern).toBeDefined();
        expect(state.group.currentAttackPattern).toBe(currentAttackPattern);
    });

    it('should not be modified on url push action', () => {
        const currentAttackPattern = AttackPatternMockFactory.mockOne();
        initialState.group.currentAttackPattern = currentAttackPattern;
        initialState.group.finishedLoadingGroupData = true;
        const state = fullAssessmentResultReducer(initialState, new actions.DonePushUrl());
        expect(state).toBeDefined();
        expect(state).toEqual(initialState);
    });

    it('should respond to a clean state action', () => {
        const currentAttackPattern = AttackPatternMockFactory.mockOne();
        initialState.group.currentAttackPattern = currentAttackPattern;
        initialState.group.finishedLoadingGroupData = true;
        const state = fullAssessmentResultReducer(initialState, new actions.CleanAssessmentResultData());
        expect(state).toBeDefined();
        expect(state.group).toBeDefined();
        expect(state.group.finishedLoadingGroupData).toBe(false);
        expect(state.group.currentAttackPattern.id).toBe(undefined);
    });

});
