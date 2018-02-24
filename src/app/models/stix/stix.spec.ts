import { Stix } from './stix';
import { StixMockFactory } from './stix-mock';

/**
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
