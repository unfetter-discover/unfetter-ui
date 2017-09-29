export class FormatHelpers {
    public static whitespaceToBreak(inputString: string): string {
        return inputString ? inputString.replace(/(?:\r\n|\r|\n)/g, '<br>') : '';
    }

    public static mitreCitationsToHtml(inputString: string): string {
        return inputString ? inputString.replace(/\[\[Citation: ([^\]\]]*)\]\]/g, `&nbsp;<small><cite class="text-muted">($1)</cite></small>`) : '';
    }
}
