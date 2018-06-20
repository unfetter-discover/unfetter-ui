import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';

import { MarkdownEditorComponent } from './markdown-editor.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MarkdownEditorComponent', () => {

    let fixture: ComponentFixture<MarkdownEditorComponent>;
    let component: MarkdownEditorComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    MarkdownEditorComponent,
                ],
                imports: [
                    FormsModule,
                    MatInputModule,
                    MarkdownModule,
                    NoopAnimationsModule,
                ],
                providers: [
                    MarkdownService,
                    MarkedOptions,
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkdownEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
