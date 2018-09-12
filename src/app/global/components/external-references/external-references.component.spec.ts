import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExternalReferencesReactiveComponent } from './external-references.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

describe('ExternalReferencesReactiveComponent', () => {

    let component: ExternalReferencesReactiveComponent;
    let fixture: ComponentFixture<ExternalReferencesReactiveComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [ 
                    ExternalReferencesReactiveComponent,
                    CapitalizePipe 
                ],
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatInputModule,
                    BrowserAnimationsModule          
                ]      
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExternalReferencesReactiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add references to a parent form', () => {
        const name = 'ref-xxx', extId = '123', description = 'A ref', url = 'a.url.com';
        component.parentForm = new FormGroup({
            external_references: new FormArray([])
        });
        component.localForm.setValue({'source_name': name, 'external_id': extId, description, url});
        component.addToParent();
        const refs = component.parentForm.get('external_references').value;
        expect(refs.length).toEqual(1);
        expect(refs[0].source_name).toEqual(name);
        expect(refs[0].external_id).toEqual(extId);
    });

});
