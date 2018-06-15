import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MatCardModule, MatChipsModule } from '@angular/material';

import { ReadonlyContentComponent } from './readonly-content.component';

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
                MatCardModule,
                MatChipsModule,
            ],
            declarations: [
                ReadonlyContentComponent,
            ],
            providers: [
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
        
        let description = fixture.debugElement.query(By.css('div.row:nth-child(2) p'));
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
