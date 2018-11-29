import { SigmaToolPipe } from './sigma-tool.pipe';
import { SigmaSupportedBackends } from '../models/sigma-translation';

describe('SigmaToolPipe', () => {

    const pipe = new SigmaToolPipe();

    Object.values(SigmaSupportedBackends).forEach(backend => {
        it(`should transform ${backend}`, () => {
            // This will fail if a backend doesn't have a transformation in the pipe
            expect(pipe.transform(backend)).not.toBe(backend);
        });
    });

    it('should return argument if not a SigmaSupportedBackend', () => {
        const fakeBackend = 'fake-backend' as SigmaSupportedBackends; 
        expect(pipe.transform(fakeBackend)).toBe(fakeBackend);
    });
});
