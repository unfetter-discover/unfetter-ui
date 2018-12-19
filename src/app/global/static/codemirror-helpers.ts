import * as CodeMirror from 'codemirror';

interface CodeMirrorWord {
    range: CodeMirror.Range,
    text: string,
    textBefore: string,
    textAfter: string
}

interface CursorGroup {
    [index: string]: CodeMirror.Position
}

export type CursorTypes = 'anchor' | 'from' | 'head' | 'to';

/**
 * @description Contains a set of functions that simplifies interaction with CodeMirror
 */
export class CodeMirrorHelpers {
    private codeMirror: CodeMirror.Editor;

    constructor(codeMirror) {
        this.codeMirror = codeMirror;
    }

    /**
     * @param {CursorTypes} cursorTypes
     * @returns {CursorSelection}
     */
    getCursor(...cursorTypes: CursorTypes[]): CursorGroup {
        const doc = this.codeMirror.getDoc();
        const cursor = doc.getCursor();

        if (!cursorTypes.length) {
            return {
                anchor: doc.getCursor('anchor'),
                from: doc.getCursor('from'),
                head: doc.getCursor('head'),
                to: doc.getCursor('to')
            } as any;
        } else {
            const retVal: any = {};
            cursorTypes.forEach((cursorType) => {
                retVal[cursorType] = doc.getCursor(cursorType);
            });
            return retVal;
        }
    }

    
    /**
     * @param  {CodeMirror.Position} cursorPos
     * @returns {CodeMirrorWord}
     * @description Helper function to help detect words at a given cursor
     *      Note: Remember that when used in conjuction with a keydown event, 
     *            it will be the state of the text is changed
     */
    getWordAt(cursorPos: CodeMirror.Position): CodeMirrorWord {
        const doc = this.codeMirror.getDoc();
        const lineContent = doc.getLine(cursorPos.line);
        let before = '';
        let after = '';

        const head = cursorPos.ch - 1;
        let i = head;
        while (i >= 0 && lineContent[i]) {
            const tokenString = lineContent[i];
            if (tokenString.match(/\s/)) {
                break;
            }
            before = tokenString + before;
            i--;
        }

        let j = head + 1;
        while (j < lineContent.length && lineContent[j]) {
            const tokenString = lineContent[j];
            if (tokenString.match(/\s/)) {
                break;
            }
            after = after + tokenString;
            j++;
        }

        const range = this.makeRange(
            { line: cursorPos.line, ch: i + 1},
            { line: cursorPos.line, ch: j }
        );

        const retVal: CodeMirrorWord = {
            range,
            text: before + after,
            textBefore: before,
            textAfter: after
        };
        return retVal;
    }
    
    /**
     * @param  {CodeMirror.Position} anchor
     * @param  {CodeMirror.Position} head
     * @returns CodeMirror.Range
     */
    makeRange(anchor: CodeMirror.Position, head: CodeMirror.Position): CodeMirror.Range {
        return {
            anchor,
            head,
            from() { return this.anchor },
            to() { return this.head }
        };
    }

    /**
     * @param  {CodeMirrorWord} word
     * @param  {CodeMirror.Position} pos
     * @param  {string} letter
     * @returns string
     * @description Predicts what a word will be after a letter is inserted at a position
     */
    predictWord(word: CodeMirrorWord, pos: CodeMirror.Position, letter: string): string {
        if (letter.length !== 1) {
            console.log('Warning: word prediction is supposed to take a single letter');
        }
        return word.textBefore + letter + word.textAfter;
    }

    /**
     * @param  {CodeMirrorWord} word
     * @param  {CodeMirror.Position} pos
     * @returns string
     * @description Predicts what a word will be after a letter is deleted at a position
     */
    predictDeletion(word: CodeMirrorWord, pos: CodeMirror.Position): string {
        let retVal = word.text.substring(0, pos.ch - word.range.anchor.ch);
        if (word.range.head.ch > pos.ch) {
            retVal += word.text.substring(pos.ch - word.range.anchor.ch + 1, word.range.head.ch - word.range.anchor.ch + 1);
        }
        return retVal;
    }
    
    /**
     * @param  {CodeMirror.Range} range
     * @param  {CodeMirror.Position} pos
     * @param  {boolean} incrementHead
     * @description Sees if a cursor position is in a given range of a word
     */
    checkIfInRange(range: CodeMirror.Range, pos: CodeMirror.Position): boolean {
        if (range.head.line !== pos.line) {
            return false
        // Increment head by 1 to allow for characters at the end of the word
        } else if (range.anchor.ch <= pos.ch && range.head.ch + 1 >= pos.ch) {
            return true;
        } else {
            return false;
        }
    }

    
    /**
     * @param  {CodeMirror.Range} range
     * @param  {string} denotion='@'
     * @returns {{ start: number, end: number }}
     * @description Verifies a range of a mention
     */
    getMentionTermRange(range: CodeMirror.Range, denotion = '@'): { start: number, end: number } {
        if (range.anchor.line !== range.head.line) {
            console.log('Warning: The word range should be on the same line');
        }
        const doc = this.codeMirror.getDoc();
        let start = -1;
        let end = -1;
        const lineContent = doc.getLine(range.anchor.line);
        if (lineContent[range.anchor.ch] && lineContent[range.anchor.ch] === denotion) {
            start = range.anchor.ch;
        } else if (lineContent[range.anchor.ch - 1] && lineContent[range.anchor.ch - 1] === denotion) {
            // For some reason, occasionally the range starts 1 char after the token
            // Keep this until that is fixed
            start = range.anchor.ch - 1;
        }
        for (let i = range.anchor.ch; i <= range.head.ch; i ++) {
            if (lineContent[i] && lineContent[i] === denotion && start === -1) {
                start = i;
            } else if (start > -1 && lineContent[i] && lineContent[i].match(/\s/)) {
                end = i;
                break;
            }
        }
        if (end === -1) {
            end = range.head.ch;
        }
        return {
            start,
            end
        };
    }

    /**
     * @param {HTMLElement} elementToPosition
     * @param {number} paddingLeft=13
     * @param {number} paddingBottom=2
     * @param {HTMLElement} relativeElement
     * @description Positions an absolute positioned HTML element at cursor
     *      The relative element is needed if there is the mentions window is wrapped 
     *      in a relative element, such as mat-sidenav-container
     */
    positionAtCursor(elementToPosition: HTMLElement, paddingLeft = 13, paddingBottom = 2, relativeElement?: HTMLElement): void {
        const pos = this.codeMirror.cursorCoords(false);
        const left = pos.left + paddingLeft, top = pos.bottom + paddingBottom;
        if (!elementToPosition.style) {
            console.log('Warning: Attempt to style an object without a style property');
        } else if (relativeElement) {
            try {
                const { top: relativeTop, left: relativeLeft } = relativeElement.getBoundingClientRect();
                const scrollTop = document.documentElement && document.documentElement.scrollTop || 0;
                const scrollLeft = document.documentElement && document.documentElement.scrollLeft || 0;
                elementToPosition.style.left = (left - relativeLeft - scrollLeft) + 'px';
                elementToPosition.style.top = (top - relativeTop - scrollTop) + 'px';                
            } catch (error) {
                console.log(error);  
            }
        } else {
            elementToPosition.style.left = left + 'px';
            elementToPosition.style.top = top + 'px';
        }
    }
}
