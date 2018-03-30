import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MatInputModule, MatCardModule } from '@angular/material';

import { ExternalReferenceComponent } from './external-reference.component';

describe('ExternalReferenceComponent', () => {

    let component: ExternalReferenceComponent;
    let fixture: ComponentFixture<ExternalReferenceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                FormsModule,
                MatInputModule,
                MatCardModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                ExternalReferenceComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExternalReferenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add external references', async(() => {
        component.model = { attributes: {} };
        fixture.detectChanges();
        expect(component.model.attributes.external_references).toBeUndefined();

        let input = fixture.debugElement.query(By.css('#add-external-references')).nativeElement;
        expect(input).not.toBeNull();
        input.click();
        fixture.whenStable().then(() => {
            expect(component.model.attributes.external_references).toBeDefined();
            expect(component.model.attributes.external_references.length).toBe(1);

            // do it again, for path coverage
            input.click();
            fixture.whenStable().then(() => {
                expect(component.model.attributes.external_references.length).toBe(2);
            });
        });
    }));

    it('should remove external references', async(() => {
        component.model = {
            attributes: {
                external_references: [
                    {external_id: 1, source_name: 'localhost', url: 'http://127.0.0.1/'},
                ]
            }
        };
        fixture.detectChanges();
        expect(component.model.attributes.external_references.length).toBe(1);

        let remove = fixture.debugElement.query(By.css('mat-card a[mat-raised-button]')).nativeElement;
        expect(remove).not.toBeNull();
        remove.click();
        fixture.whenStable().then(() => {
            expect(component.model.attributes.external_references.length).toBe(0);
        });
    }));

});
