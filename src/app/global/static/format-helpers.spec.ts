import { FormatHelpers } from './format-helpers';

describe('format helpers', () => {
    it('should replace newlines with html breaks', () => {
        const original = 'text\ntext';
        const formatted = FormatHelpers.whitespaceToBreak(original);
            expect(formatted).toEqual('text<br>text');
    });
});

