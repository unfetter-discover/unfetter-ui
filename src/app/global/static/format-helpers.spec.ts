import { FormatHelpers } from './format-helpers';

describe('format helpers', () => {
    describe('whitespaceToBreak', () => {
        it('should replace newlines with html breaks', () => {
            const original = 'text\ntext';
            const formatted = FormatHelpers.whitespaceToBreak(original);
            expect(formatted).toBe('text<br>text');
        });
    });

    describe('normalizeQuotes', () => {
        it('should remove non-standard quotes', () => {
            const original = '‘single’-“double”';
            const formatted = FormatHelpers.normalizeQuotes(original);
            expect(formatted).toBe(`'single'-"double"`);
        });
    });
});
