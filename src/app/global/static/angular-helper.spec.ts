import { AngularHelper } from './angular-helper';

describe('AngularHelper', () => {

    let t: any[];
    
    beforeEach(() => {
        t = [
            { id: 1, name: 'a' },
            { id: 2, name: 'b' },
            { id: 3, name: 'c' },
        ];
    });

    describe('genericTrackBy', () => {
        it('should use an object id first if it exists', () => {
            expect(AngularHelper.genericTrackByFn(-100, t[0])).toEqual(t[0].id);
        });

        it('should use the given index if and id does not exist', () => {
            expect(AngularHelper.genericTrackByFn(-100, t[0])).toEqual(-100);
        });
    });

});
