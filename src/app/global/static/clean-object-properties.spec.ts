import { cleanObjectProperties } from './clean-object-properties';

describe('cleanObjectProperties function', () => {
    const testObj = {
        foo: { 
            bar: [],
            bars: [null, 'string'],
            whim: '',
            wham: {},
            whap: null,
            real: 1,
            real2: false
        }
    };

    it('should remove empty arrays, nested objects, and strings', () => {
        const testObjCopy = { 
            ...testObj 
        };
        const cleanedObj = cleanObjectProperties({}, testObjCopy);
        expect(Object.entries(cleanedObj.foo)).toEqual([['bars', ['string']], ['real', 1], ['real2', false]]);
    });
});
