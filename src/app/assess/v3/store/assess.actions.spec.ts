import { CapabilityMockFactory } from 'stix/assess/v3/baseline/capability.mock';
import { CategoryMockFactory } from 'stix/assess/v3/baseline/category.mock';
import * as actions from './assess.actions';

describe('assessment v3 - assess store actions spec', () => {

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

    it('should have a fetch capabilities action', () => {
        const action = new actions.FetchCapabilities;
        expect({ ...action }).toEqual({
            type: actions.FETCH_CAPABILITIES,
        });
    });

    it('should have a fetch categories action', () => {
        const action = new actions.FetchCategories();
        expect({ ...action }).toEqual({
            type: actions.FETCH_CATEGORIES,
        });
    });

    it('should have a clean assessment wizard action', () => {
        const action = new actions.CleanAssessmentWizardData();
        expect({ ...action }).toEqual({
            type: actions.CLEAN_ASSESSMENT_WIZARD_DATA,
        });
    });

    it('should have a failed to load action 1', () => {
        const payload = false;
        const action = new actions.FailedToLoad(payload);
        expect({ ...action }).toEqual({
            type: actions.FAILED_TO_LOAD,
            payload
        });
    });

    it('should have a failed to load action 2', () => {
        const payload = true;
        const action = new actions.FailedToLoad(payload);
        expect({ ...action }).toEqual({
            type: actions.FAILED_TO_LOAD,
            payload
        });
    });

    it('should have a finished loading action 1', () => {
        const payload = false;
        const action = new actions.FinishedLoading(payload);
        expect({ ...action }).toEqual({
            type: actions.FINISHED_LOADING,
            payload
        });
    });

    it('should have a finished loading action 2', () => {
        const payload = true;
        const action = new actions.FinishedLoading(payload);
        expect({ ...action }).toEqual({
            type: actions.FINISHED_LOADING,
            payload
        });
    });

    it('should have a set categories action', () => {
        const categories = CategoryMockFactory.mockMany(2);
        const payload = categories;
        const action = new actions.SetCapabilities(payload);
        expect({ ...action }).toEqual({
            type: actions.SET_CAPABILITIES,
            payload
        });
    });

    it('should have a set capabilities action', () => {
        const capabilities = CapabilityMockFactory.mockMany(2);
        const payload = capabilities;
        const action = new actions.SetCapabilities(payload);
        expect({ ...action }).toEqual({
            type: actions.SET_CAPABILITIES,
            payload
        });
    });

});
