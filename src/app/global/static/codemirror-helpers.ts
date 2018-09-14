export interface CursorPos {
    line: number,
    ch: number
}

/**
 * doc.getCursor(?start: string) → {line, ch}
 *    Retrieve one end of the primary selection. start is an optional string indicating which end of the selection to return. 
 *    It may be "from", "to", "head" (the side of the selection that moves when you press shift+arrow), 
 *    or "anchor" (the fixed side of the selection). Omitting the argument is the same as passing "head". 
 *    A {line, ch} object will be returned.
 */
export interface CursorSelection {
    anchor?: CursorPos,
    from?: CursorPos,
    head?: CursorPos
    to?: CursorPos,
}

export type CursorTypes = 'anchor' | 'from' | 'head' | 'to';

/**
 * @description Contains a set of functions that simplifies interaction with CodeMirror
 */
export class CodeMirrorHelpers {
    private codeMirror;

    constructor(codeMirror) {
        this.codeMirror = codeMirror;
    }

    /**
     * @param {CursorTypes} cursorTypes
     * @returns {CursorSelection}
     */
    getCursor(...cursorTypes: CursorTypes[]): CursorSelection {
        const doc = this.codeMirror.getDoc();
        const cursor = doc.getCursor();

        if (!cursorTypes.length) {
            return {
                anchor: doc.getCursor('anchor'),
                from: doc.getCursor('from'),
                head: doc.getCursor('head'),
                to: doc.getCursor('to')
            };
        } else {
            const retVal = {};
            cursorTypes.forEach((cursorType) => {
                retVal[cursorType] = doc.getCursor(cursorType);
            });
            return retVal;
        }
    }
}
