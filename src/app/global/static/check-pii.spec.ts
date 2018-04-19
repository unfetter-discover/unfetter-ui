import { CheckPII } from './check-pii';

describe('CheckPII', () => {

    const noPii = 'This stuff is clean';
    const hasPii = `
        192.168.1.12
        lorem ipsum
        lorem ipsum lorem@ipsum.com
        USER=LOREM_ipsum2
        lorem ipsum 8.8.8.8 lorem ipsum
    `;

    describe('validatedNoPii', () => {
        it('should validate no pii', () => {
            expect(CheckPII.validatedNoPii(noPii)).toBe(true);
        });
        
        it('should validate presence of pii', () => {
            expect(CheckPII.validatedNoPii(hasPii)).toBe(false);
        });
    });

    describe('validationErrors', () => {
        it('should return [] without pii', () => {
            expect(CheckPII.validationErrors(noPii).length).toBeFalsy();
        });

        it('should return error messages if pii', () => {
            expect(CheckPII.validationErrors(hasPii).length).toBeTruthy();
        });
    });
});
