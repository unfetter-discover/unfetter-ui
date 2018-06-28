import { Capability } from 'stix/assess/v3/baseline/capability';
import { CapabilityMockFactory } from 'stix/assess/v3/baseline/capability.mock';
import { Category } from 'stix/assess/v3/baseline/category';
import { CategoryMockFactory } from 'stix/assess/v3/baseline/category.mock';
import { AssessState, genAssessState } from './assess.reducers';
import { getCapabilities, getCategories, getFinishedLoading, getSortedCapabilities, getSortedCategories } from './assess.selectors';

describe('assessment v3 - assess selectors spec', () => {

    let storeState: { 'assessment': AssessState };

    beforeEach(() => {
        const categories = genTestCategories();
        const capabilities = genTestCapabilities();
        const state = genAssessState();
        state.categories = categories;
        state.capabilities = capabilities;
        storeState = { 'assessment': state };
    });

    it('getFinishedLoading should return false', () => {
        const finishedLoading = getFinishedLoading(storeState);
        expect(finishedLoading).toBeDefined();
        expect(finishedLoading).toBeFalsy();
    });

    it('getFinishedLoading should return true', () => {
        storeState.assessment.finishedLoading = true;
        const finishedLoading = getFinishedLoading(storeState);
        expect(finishedLoading).toBeTruthy();
    });

    it('getCapabilities should return', () => {
        const expected = storeState.assessment.capabilities;
        const capabilities = getCapabilities(storeState);
        expect(capabilities).toBeTruthy();
        expect(Array.isArray(capabilities)).toBeTruthy();
        expect(capabilities).toEqual(expected);
    });

    it('getSortedCapabilities should return', () => {
        // unsort
        storeState.assessment.capabilities[0].name = 'z';
        storeState.assessment.capabilities[1].name = 'a';
        const capabilities = getSortedCapabilities(storeState);
        expect(capabilities).toBeTruthy();
        expect(Array.isArray(capabilities)).toBeTruthy();
        expect(ensureSorted(capabilities)).toBeTruthy();
    });

    it('getCategories should return', () => {
        const expected = storeState.assessment.categories;
        const categories = getCategories(storeState);
        expect(categories).toBeTruthy();
        expect(Array.isArray(categories)).toBeTruthy();
        expect(categories).toEqual(expected);
    });

    it('getSortedCategories should return', () => {
        // unsort
        storeState.assessment.categories[0].name = 'z';
        storeState.assessment.categories[1].name = 'a';
        const categories = getSortedCategories(storeState);
        expect(categories).toBeTruthy();
        expect(Array.isArray(categories)).toBeTruthy();
        expect(ensureSorted(categories)).toBeTruthy();
    });

    function ensureSorted(arr: any[]): boolean {
        let prev = arr[0];
        const allDesc = arr.every((cur) => {
            const isDesc = prev.name <= cur.name;
            prev = cur;
            return isDesc;
        });
        return allDesc;
    }

    function genTestCategories(): Category[] {
        return CategoryMockFactory.mockMany(5);
    }

    function genTestCapabilities(): Capability[] {
        return CapabilityMockFactory.mockMany(5);
    }

});
