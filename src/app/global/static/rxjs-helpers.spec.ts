import { RxjsHelpers } from './rxjs-helpers';

describe('RxjsHelpers class', () => {

    describe('mapArrayAttributes function', () => {
        const jsonApiArr = [
            {
                attributes: {
                    foo: 1
                }
            }
        ];

        it('should map JSON API arrays', () => {
            const mappedArr = RxjsHelpers.mapArrayAttributes(jsonApiArr);
            expect(mappedArr[0].attributes).toBeUndefined();
        });
    });

});
