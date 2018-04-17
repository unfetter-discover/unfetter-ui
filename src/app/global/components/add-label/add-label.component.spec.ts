import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatAutocompleteModule, MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { AddLabelReactiveComponent } from './add-label.component';
import { mockConfigService } from '../../../testing/mock-config-service';
import { ConfigService } from '../../../core/services/config.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddLabelReactiveComponent', () => {
    let component: AddLabelReactiveComponent;
    let fixture: ComponentFixture<AddLabelReactiveComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AddLabelReactiveComponent,
                CapitalizePipe
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatInputModule,
                MatAutocompleteModule,
                MatTooltipModule,
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: mockConfigService
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddLabelReactiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add label to parent form', () => {
        component.showAddLabel = true;
        component.localForm.setValue('test2');
        component.addToParent();
        fixture.detectChanges();
        expect(component.localForm.value).toBe('');
        expect(component.parentForm.get('labels').value.includes('test2')).toBeTruthy();
        expect(component.showAddLabel).toBeFalsy();
    });
});
