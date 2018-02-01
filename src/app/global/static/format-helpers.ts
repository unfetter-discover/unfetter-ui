export class FormatHelpers {   
    public static whitespaceToBreak(inputString: string): string {
        return inputString ? inputString.replace(/(?:\r\n|\r|\n)/g, '<br>') : '';
    }

    public static formatAll(inputString) {
        return FormatHelpers.whitespaceToBreak(inputString);
    }
}
