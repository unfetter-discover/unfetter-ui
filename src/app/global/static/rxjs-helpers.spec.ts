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

    describe('relationshipArrayToObject function', () => {
        const relArr = [
            {
                _id: '1234',
                mockData: [1, 2, 3]
            },
            {
                _id: '4567',
                mockData: [4, 5]
            }
        ]

        it('should transform relationship array to object', () => {
            const relObj = RxjsHelpers.relationshipArrayToObject(relArr, 'mockData');
            expect(relObj['1234'].length).toBe(3);
            expect(relObj['4567'].length).toBe(2);
        });

        it('should return undefined when given wrong property', () => {
            const relObj = RxjsHelpers.relationshipArrayToObject(relArr, 'wrongProperty');
            expect(relObj['1234']).toBe(undefined);
            expect(relObj['4567']).toBe(undefined);
        });
    });
});
