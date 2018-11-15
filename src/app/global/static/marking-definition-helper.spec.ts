import MarkingDefinitionHelpers from './marking-definition-helper';

describe('MarkingDefinitionHelpers', () => {

    it('should print TLP values', () => {
        const tlp = 'amber';
        const label = MarkingDefinitionHelpers.getMarkingLabel({
            definition_type: 'tlp',
            definition: { tlp: tlp }
        });
        expect(label).toEqual(`TLP: ${tlp}`);
    });

    it('should print Unfetter-defined CAPCO values', () => {
        const category = 'Class', text = 'CRITICAL';
        const label = MarkingDefinitionHelpers.getMarkingLabel({
            definition_type: 'capco',
            definition: { category: category, text: text }
        });
        expect(label).toEqual(`${category}: ${text}`);
    });

    it('should print Unfetter-defined ratings', () => {
        const rating = 5, text = 'Super High';
        const label = MarkingDefinitionHelpers.getMarkingLabel({
            definition_type: 'rating',
            definition: { rating: rating, label: text }
        });
        expect(label).toEqual(`Rating: (${rating}) ${text}`);
    });

    it('should map statements', () => {
        const statement = 'This is a test';
        const label = MarkingDefinitionHelpers.getMarkingLabel({
            definition_type: 'statement',
            definition: { statement: statement }
        });
        expect(label).toEqual(statement);
    });

    it('should not map anything else', () => {
        expect(MarkingDefinitionHelpers.getMarkingLabel(null)).toEqual('unknown marking');
        expect(MarkingDefinitionHelpers.getMarkingLabel({})).toEqual('unknown marking');
        expect(MarkingDefinitionHelpers.getMarkingLabel({
            definition_type: 'marking'
        })).toEqual('unknown marking');
    });

});
