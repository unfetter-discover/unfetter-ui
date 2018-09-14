import * as CodeMirror from 'CodeMirror';

interface CodeMirrorWord {
    range: CodeMirror.Range,
    text: string
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
        const range = this.codeMirror.findWordAt(cursorPos);
        if (range.anchor.line !== range.head.line) {
            console.log('Warning: Attempting to retrieve a multi-line word');
        }
        const rangeDelta = range.head.ch - range.anchor.ch;
        let text = '';
        for (let i = range.anchor.ch; i <= range.head.ch; i++) {
            const pos: CodeMirror.Position = {
                line: range.head.line,
                ch: i
            };
            const token = this.codeMirror.getTokenAt(pos);
            text += token.string;
        }
        return { range, text: text };
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
        let retVal = word.text.substring(0, pos.ch - word.range.anchor.ch + 1);
        retVal += letter;
        if (word.range.head.ch > pos.ch) {
            retVal += word.text.substring(pos.ch - word.range.anchor.ch + 1, word.range.head.ch - word.range.anchor.ch + 1);
        }
        return retVal;
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

    getMentionTermRange(range: CodeMirror.Range, denotion = '@'): { start: number, end: number } {
        if (range.anchor.line !== range.head.line) {
            console.log('Warning: The word range should be on the same line');
        }
        let start = -1;
        let end = -1;
        const lineTokens = this.codeMirror.getLineTokens(range.anchor.line);
        if (lineTokens[range.anchor.ch] && lineTokens[range.anchor.ch].string === denotion) {
            start = range.anchor.ch;
        } else if (lineTokens[range.anchor.ch - 1] && lineTokens[range.anchor.ch - 1].string === denotion) {
            // For some reason, occasionally the range starts 1 char after the token
            // Keep this until that is fixed
            start = range.anchor.ch - 1;
        }
        for (let i = range.anchor.ch; i <= range.head.ch; i ++) {
            if (lineTokens[i] && lineTokens[i].string === denotion && start === -1) {
                start = i;
            } else if (start > -1 && lineTokens[i] && lineTokens[i].string.match(/\s/)) {
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
     * @param {any} nativeElement
     * @description Positions an absolute positioned HTML element at cursor
     */
    positionAtCursor(nativeElement: any) {
        const pos = this.codeMirror.cursorCoords(false);
        const left = pos.left + 10, top = pos.bottom;
        if (!nativeElement.style) {
            console.log('Warning: Attempt to style an object without a style property');
        } else {
            nativeElement.style.left = left + 'px';
            nativeElement.style.top = top + 'px';
        }
    }
}
