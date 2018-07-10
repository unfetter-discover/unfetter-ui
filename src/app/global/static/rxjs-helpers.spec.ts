import { RxjsHelpers } from './rxjs-helpers';
import { of as observableOf, Observable } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

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

    describe('unwrapJsonApi function', () => {
        const jsonApiArr = [
            {
                attributes: {
                    foo: 1
                }
            }
        ];

        it('should map JSON API arrays', (done) => {
            observableOf(jsonApiArr)
                .pipe(
                    RxjsHelpers.unwrapJsonApi()
                )
                .subscribe((res) => {
                    expect(res[0].attributes).toBeUndefined();
                    done();
                });
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
            observableOf(fakeConfigurations)
                .pipe(
                    filter(RxjsHelpers.filterByConfigKey('foo' as any)),
                    pluck('foo')
                )
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
            const zfilter = RxjsHelpers.filterByConfigKey('fakekey' as any);
            const result = zfilter(fakeConfigurations);
            expect(result).toBeFalsy();
        });
    });

    describe('sortByField function', () => {
        const objArray = [
            {
                foo: 5
            },
            {
                foo: 3
            },
            {
                foo: 7
            }
        ];

        it('should sort by a field in ascending order', (done) => {
            observableOf(objArray)
                .pipe(
                    RxjsHelpers.sortByField('foo', 'ASCENDING')
                )
                .subscribe((res) => {
                    expect(res[0].foo).toBe(3);
                    done();
                });
        });

        it('should sort by a field in descending order', (done) => {
            observableOf(objArray)
                .pipe(
                    RxjsHelpers.sortByField('foo')
                )
                .subscribe((res) => {
                    expect(res[0].foo).toBe(7);
                    done();
                });
        });
    });
});
