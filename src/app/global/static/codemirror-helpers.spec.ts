import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as CodeMirror from 'codemirror';
import { CodeMirrorHelpers } from './codemirror-helpers';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';
import { SimpleMDEConfig } from './simplemde-config';
import { FormsModule } from '@angular/forms';


@Component({
    template: `
        <simplemde [(ngModel)]="data" #mde></simplemde>
    `
})
class CodeMirrorTestComponent implements AfterViewInit {
    codeMirror: CodeMirror.Editor;
    @ViewChild('mde')
    mde: any;
    data: string;

    ngAfterViewInit() {
        this.codeMirror = this.mde.simplemde.codemirror;
    }
}

fdescribe('CodeMirrorHelpers', () => {
    let component: CodeMirrorTestComponent;
    let fixture: ComponentFixture<CodeMirrorTestComponent>;
    let codeMirrorHelpers: CodeMirrorHelpers;
    let codeMirror: CodeMirror.Editor;

    const testString = 'this is a unit test\n' + 
    'to see how codemirror works\n' + 
    'when used in simplemde\n' + 
    '@jim mentioned @bob also @fred';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CodeMirrorTestComponent],
            imports: [
                FormsModule,
                SimplemdeModule.forRoot({
                    provide: SIMPLEMDE_CONFIG,
                    useValue: SimpleMDEConfig.basicConfig
                })
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CodeMirrorTestComponent);
        component = fixture.componentInstance;
        component.data = testString;
        fixture.detectChanges();
    });

    beforeEach((done) => {
        // This seems to be needed to allow the vanilla JS for codemirror to catch up
        setTimeout(() => {
            codeMirror = component.codeMirror;
            codeMirrorHelpers = new CodeMirrorHelpers(codeMirror);
            fixture.detectChanges();
            done();
        }, 50);
    });

    describe('getCursor', () => {

        it('should get cursor position for a single cursor', () => {
            const mockCursor = { line: 0, ch: 3 };
            const doc = component.codeMirror.getDoc();
            component.codeMirror.focus();
            doc.setCursor(mockCursor);
            const cursor = codeMirrorHelpers.getCursor();
            expect(cursor.from).toEqual(mockCursor);
            expect(cursor.anchor).toEqual(mockCursor);
            expect(cursor.to).toEqual(mockCursor);
            expect(cursor.head).toEqual(mockCursor);
        });

        it('should get cursor positions for a selection', () => {
            const mockCursorFrom = { line: 0, ch: 3 };
            const mockCursorTo = { line: 0, ch: 7 };
            const doc = component.codeMirror.getDoc();
            component.codeMirror.focus();
            doc.setSelection(mockCursorFrom, mockCursorTo);
            const cursor = codeMirrorHelpers.getCursor();
            expect(cursor.from).toEqual(mockCursorFrom);
            expect(cursor.anchor).toEqual(mockCursorFrom);
            expect(cursor.to).toEqual(mockCursorTo);
            expect(cursor.head).toEqual(mockCursorTo);
        });

        it('should get cursor positions for a multi-line selection', () => {
            const mockCursorFrom = { line: 1, ch: 6 };
            const mockCursorTo = { line: 2, ch: 4 };
            const doc = component.codeMirror.getDoc();
            component.codeMirror.focus();
            doc.setSelection(mockCursorFrom, mockCursorTo);
            const cursor = codeMirrorHelpers.getCursor();
            expect(cursor.from).toEqual(mockCursorFrom);
            expect(cursor.anchor).toEqual(mockCursorFrom);
            expect(cursor.to).toEqual(mockCursorTo);
            expect(cursor.head).toEqual(mockCursorTo);
        });
    });

    describe('getWordAt', () => {
        const words = testString.split('\n').map(line => line.split(' '));

        it('should find a word at the beginning of a line', () => {
            const mockCursor = { line: 2, ch: 2 };
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            expect(word.text).toBe(words[2][0]);
            expect(word.textBefore).toBe(words[2][0].substring(0, mockCursor.ch));
            expect(word.textAfter).toBe(words[2][0].substring(mockCursor.ch, words[2][0].length));
        });

        it('should find a word at the end of a line', () => {
            const mockCursor = { line: 0, ch: words[0].join(' ').length - 2 };
            const canidateWord = words[0][words[0].length - 1];
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            expect(word.text).toBe(canidateWord);
            expect(word.textBefore).toBe(canidateWord.substring(0, 2));
            expect(word.textAfter).toBe(canidateWord.substring(2, canidateWord.length));
        });

        it('should find a word in the middle of a line', () => {
            const mockCursor = { line: 0, ch: 12 };
            const canidateWord = 'unit';
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            expect(word.text).toBe(canidateWord);
            expect(word.textBefore).toBe(canidateWord.substring(0, 2));
            expect(word.textAfter).toBe(canidateWord.substring(2, canidateWord.length));
        });
    });

    describe('makeRange', () => {
        it('should make a working Range object', () => {
            const mockAnchor = { line: 2, ch: 10 };
            const mockHead = { line: 2, ch: 15 };
            const range = codeMirrorHelpers.makeRange(mockAnchor, mockHead);
            expect(range.anchor).toEqual(mockAnchor);
            expect(range.from()).toEqual(mockAnchor);
            expect(range.head).toEqual(mockHead);
            expect(range.to()).toEqual(mockHead);
        });
    });

    describe('predictWord', () => {
        it('should predict a word when a letter is inserted at the end of a word', () => {
            const mockCursor = { line: 2, ch: 4 };
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            const predicted = codeMirrorHelpers.predictWord(word, mockCursor, 'e');
            expect(predicted).toBe('whene');
        });

        it('should predict a word when a letter is inserted in the middle of a word', () => {
            const mockCursor = { line: 2, ch: 2 };
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            const predicted = codeMirrorHelpers.predictWord(word, mockCursor, 'e');
            expect(predicted).toBe('wheen');
        });

        it('should predict a word when a letter is inserted in the middle of a word, in the middle of a line', () => {
            const mockCursor = { line: 2, ch: 6 };
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            const predicted = codeMirrorHelpers.predictWord(word, mockCursor, 'e');
            expect(predicted).toBe('uesed');
        });

        it('should predict a word when a letter is inserted at the start of a word', () => {
            const mockCursor = { line: 2, ch: 0 };
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            const predicted = codeMirrorHelpers.predictWord(word, mockCursor, 'e');
            expect(predicted).toBe('ewhen');
        });
    });

    describe('predictDeletion', () => {
        it('should predict a delete when a letter is deleted at the end of a word', () => {
            const mockCursor = { line: 2, ch: 3 };
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            const predicted = codeMirrorHelpers.predictDeletion(word, mockCursor);
            expect(predicted).toBe('whe');
        });

        it('should predict a delete when a letter is deleted in the middle of a word', () => {
            const mockCursor = { line: 2, ch: 2 };
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            const predicted = codeMirrorHelpers.predictDeletion(word, mockCursor);
            expect(predicted).toBe('whn');
        });

        it('should predict a delete when a letter is deleted in the middle of a word, in the middle of a line', () => {
            const mockCursor = { line: 2, ch: 6 };
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            const predicted = codeMirrorHelpers.predictDeletion(word, mockCursor);
            expect(predicted).toBe('ued');
        });

        it('should predict a delete when a letter is deleted at the start of a word', () => {
            const mockCursor = { line: 2, ch: 0 };
            const word = codeMirrorHelpers.getWordAt(mockCursor);
            const predicted = codeMirrorHelpers.predictDeletion(word, mockCursor);
            expect(predicted).toBe('hen');
        });
    });

    describe('checkIfInRange', () => {
        let mockRange: CodeMirror.Range;

        beforeEach(() => mockRange = codeMirrorHelpers.makeRange({ line: 1, ch: 5 }, { line: 1, ch: 7 }));

        it('should return true if in range', () => {
            const pos = { line: 1, ch: 6 };
            const inRange = codeMirrorHelpers.checkIfInRange(mockRange, pos);
            expect(inRange).toBe(true);
        });

        it('should return true if in range, at the start of a line', () => {
            mockRange.anchor.ch = 0;
            const pos = { line: 1, ch: 0 };
            const inRange = codeMirrorHelpers.checkIfInRange(mockRange, pos);
            expect(inRange).toBe(true);
        });

        it('should return true if in range, at the end of a range', () => {
            const pos = { line: 1, ch: 7 };
            const inRange = codeMirrorHelpers.checkIfInRange(mockRange, pos);
            expect(inRange).toBe(true);
        });

        it('should return false if before range', () => {
            const pos = { line: 1, ch: 2 };
            const inRange = codeMirrorHelpers.checkIfInRange(mockRange, pos);
            expect(inRange).toBe(false);
        });

        it('should return false if after range', () => {
            const pos = { line: 1, ch: 9 };
            const inRange = codeMirrorHelpers.checkIfInRange(mockRange, pos);
            expect(inRange).toBe(false);
        });

        it('should return false if on a different line', () => {
            const pos = { line: 0, ch: 6 };
            const inRange = codeMirrorHelpers.checkIfInRange(mockRange, pos);
            expect(inRange).toBe(false);
        });
    });

    describe('getMentionTermRange', () => {
        let mockRange: CodeMirror.Range;
        beforeEach(() => mockRange = codeMirrorHelpers.makeRange({ line: 3, ch: 0 }, { line: 3, ch: 3 }));
        
        it('should range of mention at beginning of line', () => {
            const mentionTermRange = codeMirrorHelpers.getMentionTermRange(mockRange);
            expect(mentionTermRange.start).toBe(0);
            expect(mentionTermRange.end).toBe(3);
        });

        it('should range of mention at middle of line', () => {
            mockRange.anchor.ch = 15;
            mockRange.head.ch = 18;
            const mentionTermRange = codeMirrorHelpers.getMentionTermRange(mockRange);
            expect(mentionTermRange.start).toBe(15);
            expect(mentionTermRange.end).toBe(18);
        });

        it('should range of mention at end of line', () => {
            mockRange.anchor.ch = 25;
            mockRange.head.ch = 28;
            const mentionTermRange = codeMirrorHelpers.getMentionTermRange(mockRange);
            expect(mentionTermRange.start).toBe(25);
            expect(mentionTermRange.end).toBe(28);
        });
    });
});
