/**
 * @description generic date functions
 */
export class DateHelper {

    /**
     * @description change the given date string to an iso format or return undefined
     * @param {string} date
     * @return {string | undefined}
     */
    public static getISOOrUndefined(date: string): string | undefined {
        if (!date) {
            return undefined;
        }

        // can we parse the date?
        const timestamp = Date.parse(date);
        if (isNaN(timestamp) === true) {
            return undefined;
        }

        const d = new Date(timestamp);
        return d.toISOString();
    }
}
