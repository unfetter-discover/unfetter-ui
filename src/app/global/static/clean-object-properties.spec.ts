import { cleanObjectProperties } from './clean-object-properties';

describe('cleanObjectProperties function', () => {
    const testObj = {
        foo: { 
            bar: [],
            whim: '',
            wham: {},
            real: 1
        }
    };

    it('should remove empty arrays, nested objects, and strings', () => {
        const testObjCopy = { 
            ...testObj 
        };
        const cleanedObj = cleanObjectProperties({}, testObjCopy);
        expect(JSON.stringify(cleanedObj.foo)).toEqual('{"real":1}');
    });
});
