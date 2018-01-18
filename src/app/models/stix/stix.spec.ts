import { Stix } from './stix';

/**
 * @see https://stixproject.github.io/
 */
describe('stix model', () => {

    let stix: Stix;

    beforeEach(() => {
        stix = new Stix();
        stix.description = 'description';
        stix.name = 'stixname';
        stix.object_refs = [ 'ref1', 'ref2' ];
        stix.created_by_ref = 'author';
    });

    it('should have a constructor', () => {
        expect(stix).toBeDefined();
    });

});
