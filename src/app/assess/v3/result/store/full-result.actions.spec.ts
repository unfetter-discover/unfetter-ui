import { AttackPatternMockFactory } from 'stix/unfetter/attack-pattern.mock';
import * as actions from './full-result.actions';

describe('assessment v3 - full result actions spec', () => {

    beforeEach(() => {
    });

    it('should have a FinishedLoading action 1', () => {
        const payload = true;
        const action = new actions.FinishedLoading(payload);
        expect({ ...action }).toEqual({
            type: actions.FINISHED_LOADING,
            payload,
        });
    });

    it('should have a FinishedLoading action 2', () => {
        const payload = false;
        const action = new actions.FinishedLoading(payload);
        expect({ ...action }).toEqual({
            type: actions.FINISHED_LOADING,
            payload,
        });
    });

    it('should have a FailedToLoad action 1', () => {
        const payload = true;
        const action = new actions.FailedToLoad(payload);
        expect({ ...action }).toEqual({
            type: actions.FAILED_TO_LOAD,
            payload,
        });
    });

    it('should have a FailedToLoad action 2', () => {
        const payload = false;
        const action = new actions.FailedToLoad(payload);
        expect({ ...action }).toEqual({
            type: actions.FAILED_TO_LOAD,
            payload,
        });
    });

    it('should have a CleanAssessmentResultData action', () => {
        const action = new actions.CleanAssessmentResultData();
        expect({ ...action }).toEqual({
            type: actions.CLEAN_ASSESSMENT_RESULT_DATA,
        });
    });

    it('should have a DonePushUrl action', () => {
        const action = new actions.DonePushUrl();
        expect({ ...action }).toEqual({
            type: actions.DONE_PUSH_URL,
        });
    });

    it('should have a PushUrl action', () => {
        const payload = {
            rollupId: '123',
            assessmentId: 'assessment123',
            phase: 'phase1',
            attackPattern: 'attack-pattern-1',
        };

        const action = new actions.PushUrl(payload);
        expect({ ...action }).toEqual({
            type: actions.PUSH_URL,
            payload,
        });
    });

    it('should have a SetGroupCurrentAttackPattern action', () => {
        const currentAttackPattern = AttackPatternMockFactory.mockOne();
        const payload = {
            currentAttackPattern,
        }

        const action = new actions.SetGroupCurrentAttackPattern(payload);
        expect({ ...action }).toEqual({
            type: actions.SET_GROUP_CURRENT_ATTACK_PATTERN,
            payload,
        });
    });

});
