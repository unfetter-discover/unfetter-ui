export class FormatHelpers {   
    public static whitespaceToBreak(inputString: string): string {
        return inputString ? inputString.replace(/(?:\r\n|\r|\n)/g, '<br>') : '';
    }

    public static formatAll(inputString: string): string {
        return FormatHelpers.whitespaceToBreak(inputString);
    }

    /**
     * @param  {string} inputString
     * @returns string
     * @description Replaces smart quotes from word processors with standard single and double quotes
     */
    public static normalizeQuotes(inputString: string): string {
        inputString = inputString.replace(/[\u2018\u2019\u201A]/g, '\'');
        inputString = inputString.replace(/[\u201C\u201D\u201E]/g, '\"');
        return inputString;
    }
}
