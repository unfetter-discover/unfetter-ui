import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { MarkdownComponent, MarkdownService, MarkedOptions } from 'ngx-markdown';

import { HelpWindowComponent } from './help-window.component';
import { MarkdownEditorComponent } from '../markdown-editor/markdown-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChange } from '@angular/core';

describe('HelpWindowComponent', () => {

    let fixture: ComponentFixture<HelpWindowComponent>;
    let component: HelpWindowComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    HelpWindowComponent,
                    MarkdownEditorComponent,
                    MarkdownComponent,
                ],
                imports: [
                    BrowserAnimationsModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatButtonModule,
                    MatInputModule,
                ],
                providers: [
                    MarkdownService,
                    MarkedOptions,
                ]
            })
            .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(HelpWindowComponent);
        component = fixture.componentInstance;
        component.helpHtml = '';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the help text', () => {
        const text = 'Now is the time for all good men\nto come to the aid of their country.';
        const expected = 'Now is the time for all good men to come to the aid of their country.';
        component.helpHtml = text;
        component.ngOnChanges({helpHtml: new SimpleChange('', text, true)});
        expect(component.helpHtml).toEqual(expected);
        component.showHelp = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const markdown = fixture.nativeElement.querySelector('markdown-editor markdown');
            expect(markdown).toBeDefined();
            expect(markdown.textContent.trimEnd()).toEqual(expected);
        });
    });

});
