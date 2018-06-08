import { RxjsHelpers } from './rxjs-helpers';
import { Observable } from 'rxjs/Observable';

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

    describe('filterByConfigKey function', () => {
        const fakeConfigurations = { foo: true, bar: true };

        it('should return a filter to find the key', (done) => {
            Observable.of(fakeConfigurations)
                .filter(RxjsHelpers.filterByConfigKey('foo' as any))
                .pluck('foo')
                .subscribe(
                    (configValue) => {
                        expect(configValue).toBeTruthy();
                        done();
                    },
                    (err) => {
                        console.log(err);
                    }
                );
        });

        it('should fail to find a fake key', () => {
            const filter = RxjsHelpers.filterByConfigKey('fakekey' as any);
            const result = filter(fakeConfigurations);
            expect(result).toBeFalsy();
        });
    });
});
