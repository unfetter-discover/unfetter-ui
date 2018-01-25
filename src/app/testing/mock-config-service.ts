import { mockConfig } from './mock-store';

export const mockConfigService = {
    getConfigPromise: (): Promise<any> => {
        return Promise.resolve(mockConfig);
    }
}
