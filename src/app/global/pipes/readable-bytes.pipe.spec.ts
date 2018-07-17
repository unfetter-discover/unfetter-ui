import { ReadableBytesPipe } from './readable-bytes.pipe';

describe('ReadableBytesPipe', () => {
    const pipe = new ReadableBytesPipe();

    it('should convert Bytes', () => {
        expect(pipe.transform(3)).toBe('3 Bytes');
    });

    it('should convert KiloBytes', () => {
        expect(pipe.transform(2048)).toBe('2.0 KB');
        expect(pipe.transform(2560)).toBe('2.5 KB');
    });

    it('should convert MegaBytes', () => {
        expect(pipe.transform(1048576)).toBe('1.0 MB');
        // Rounded
        expect(pipe.transform(1887436)).toBe('1.8 MB');
    });

    it('should convert GigaBytes', () => {
        expect(pipe.transform(1073741824)).toBe('1.0 GB');
        // Rounded
        expect(pipe.transform(1288490188)).toBe('1.2 GB');
    });

    it('should convert TeraBytes', () => {
        expect(pipe.transform(1099511627776)).toBe('1.0 TB');
        // Rounded
        expect(pipe.transform(1209462790553)).toBe('1.1 TB');
    });
});
