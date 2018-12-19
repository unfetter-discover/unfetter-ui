import { SophisticationPipe } from './sophistication.pipe';

describe('SophisticationPipe', () => {

    const pipe = new SophisticationPipe();

    it('should convert 0', () => {
        expect(pipe.transform(0)).toEqual('Novice');
    });

    it('should convert 1', () => {
        expect(pipe.transform(1)).toEqual('Practitioner');
    });

    it('should convert 2', () => {
        expect(pipe.transform(2)).toEqual('Expert');
    });

    it('should convert 3', () => {
        expect(pipe.transform(3)).toEqual('Innovator');
    });

    it('should not convert anything else', () => {
        expect(pipe.transform(null)).toBeNull();
        expect(pipe.transform(undefined)).toBeUndefined();
        expect(pipe.transform(-1)).toBe(-1);
        expect(pipe.transform(-1)).toBe(-1);
        expect(pipe.transform('bob')).toBe('bob');
    });

});
