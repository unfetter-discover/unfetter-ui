interface RegexValidator {
    regex: RegExp;
    name: string;
}

export class CheckPII {
    private static REGEX_VALIDATORS: RegexValidator[] = [
        {
            regex: /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g,
            name: 'IP Address'
        },
        {
            regex: /user(name)?=\w+/ig,
            name: 'User Name'
        },
        {
            regex: /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g,
            name: 'Email'
        }
    ];

    /**
     * @param  {string} inputString
     * @returns boolean
     * @description Returns true checks for PII fail
     */
    public static validatedNoPii(inputString: string): boolean {
        for (const regexValidator of this.REGEX_VALIDATORS) {
            if (inputString.match(regexValidator.regex) !== null) {
                return false;
            }
        }
        return true;
    }
    /**
     * @param  {string} inputString
     * @returns array
     * @description Returns names of matches of PII check failures, or else []
     */
    public static validationErrors(inputString: string): [{name: string, matches: string[]}] | any[] {
        const errors = [];
        for (const regexValidator of this.REGEX_VALIDATORS) {
            if (inputString.match(regexValidator.regex) !== null) {
                errors.push({
                    name: regexValidator.name,
                    matches: inputString.match(regexValidator.regex)
                });
            }
        }
        return errors;
    }
}
