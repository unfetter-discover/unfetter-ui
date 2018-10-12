import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';

import { AdditionalQueriesComponent } from './additional-queries.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

fdescribe('AdditionalQueriesComponent', () => {

    let fixture: ComponentFixture<AdditionalQueriesComponent>;
    let component: AdditionalQueriesComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [ 
                    AdditionalQueriesComponent,
                    CapitalizePipe 
                ],
                imports: [
                    MatButtonModule,
                    MatInputModule,
                    BrowserAnimationsModule
                ],
                schemas: [NO_ERRORS_SCHEMA]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdditionalQueriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should format queries', () => {
        const query = 'B\u2019s ID: \u201CBob\u201D';
        const formatted = 'B\'s ID: "Bob"';
        const form = new FormControl(query);
        component.queryChange(form);
        expect(form.value).toEqual(formatted);
    });

    it('should add queries to a parent form', () => {
        const name = 'id', value = '123', details = 'a super awesome query';
        component.parentForm = new FormGroup({
            metaProperties: new FormGroup({
                additional_queries: new FormArray([])
            })
        });
        component.localForm.patchValue({'name': name, 'query': value, details });
        component.addToParent();
        const queries = component.parentForm.get('metaProperties').get('additional_queries').value;
        expect(queries.length).toEqual(1);
        expect(queries[0].name).toEqual(name);
        expect(queries[0].query).toEqual(value);
        expect(queries[0].details).toEqual(details);
    });

});
