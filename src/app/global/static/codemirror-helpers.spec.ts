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

describe('CodeMirrorHelpers', () => {
    let component: CodeMirrorTestComponent;
    let fixture: ComponentFixture<CodeMirrorTestComponent>;
    let codeMirrorHelpers: CodeMirrorHelpers;
    let codeMirror: CodeMirror.Editor;

    const testString = 'this is a unit test\nto see how codemirror works\nwhen used in simplemde';

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
        setTimeout(() => {
            codeMirror = component.codeMirror;
            codeMirrorHelpers = new CodeMirrorHelpers(codeMirror);
            fixture.detectChanges();
            done();
        }, 100);
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
});
