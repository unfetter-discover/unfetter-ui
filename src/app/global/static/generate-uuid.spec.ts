import { generateUUID } from './generate-uuid';

describe('generate uuid (warning: randomness contained)', () => {
    const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    let uuid: string;

    beforeEach(() => {
        uuid = generateUUID();
    });

    it('should match a uuid regex', () => {
        expect(uuid.match(uuidRegex)).toBeTruthy();
    });

    it('should make a unique uuid', () => {
        const uuid2 = generateUUID();
        expect(uuid === uuid2).toBeFalsy();
    });
});
