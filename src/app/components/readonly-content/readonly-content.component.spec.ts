import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { MatCardModule, MatChipsModule, MatInputModule } from '@angular/material';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';

import { ReadonlyContentComponent } from './readonly-content.component';
import { MarkdownEditorComponent } from '../../global/components/markdown-editor/markdown-editor.component';

describe('ReadonlyContentComponent', () => {

    let component: ReadonlyContentComponent;
    let fixture: ComponentFixture<ReadonlyContentComponent>;

    const mockModel = {
        attributes: {
            name: 'Test data',
            description: 'This is a test. This is only a test.',
            labels: [ 'abcdef', 'ghijkl', 'mnopqr', 'stuvwx', ],
            external_references: [ { source_name: 'yz' }, ],
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                FormsModule,
                MatCardModule,
                MatChipsModule,
                MatInputModule,
            ],
            declarations: [
                ReadonlyContentComponent,
                MarkdownEditorComponent,
                MarkdownComponent,
            ],
            providers: [
                {
                    provide: MarkdownService,
                    useValue: {
                        compile: (str) => { console.log('markdownservice compile call', str); return str; },
                        highlight: () => { console.log('markdownservice highlight'); },
                    }
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadonlyContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display name data', async(() => {
        component.model = Object.assign({}, mockModel);
        fixture.detectChanges();

        let name = fixture.debugElement.query(By.css('div.row:nth-child(1) p'));
        expect(name).not.toBeNull();
        expect(name.nativeElement.textContent).toMatch(component.model.attributes.name);
    }));

    it('should display desc data', async(() => {
        component.model = Object.assign({}, mockModel);
        fixture.detectChanges();
        
        let description = fixture.debugElement.query(By.css('div.row:nth-child(2) markdown'));
        expect(description).not.toBeNull();
        expect(description.nativeElement.textContent).toMatch(component.model.attributes.description);
    }));

    xit('should display label data', async(() => {
        component.model = Object.assign({}, mockModel);
        fixture.detectChanges();

        let labels = fixture.debugElement.queryAll(By.css('mat-chip-list#labels mat-chip'));
        expect(labels).not.toBeNull();
        expect(labels.length).toEqual(component.model.attributes.labels.length);
    }));

    xit('should display ext ref data', async(() => {
        component.model = Object.assign({}, mockModel);
        fixture.detectChanges();

        let refs = fixture.debugElement.queryAll(By.css('mat-chip-list#ext-refs mat-chip'));
        expect(refs).not.toBeNull();
        expect(refs.length).toEqual(component.model.attributes.external_references.length);
    }));

});
