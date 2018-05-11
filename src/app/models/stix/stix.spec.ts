import { Stix } from './stix';
import { StixMockFactory } from './stix-mock';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @see https://stixproject.github.io/
 */
describe('stix model', () => {

    let stix: Stix;

    beforeEach(() => {
        stix = StixMockFactory.mockOne();
    });

    it('should have a constructor', () => {
        expect(stix).toBeDefined();
    });

});
