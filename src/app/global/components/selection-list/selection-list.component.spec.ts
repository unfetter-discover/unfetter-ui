import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormControl, FormArray } from '@angular/forms';
import { MatInputModule, MatListModule, MatCheckboxModule } from '@angular/material';

import { SelectionListComponent } from './selection-list.component';
import { FieldSortPipe } from '../../pipes/field-sort.pipe';

describe('SelectionListComponent', () => {

    let fixture: ComponentFixture<SelectionListComponent>;
    let component: SelectionListComponent;

    const mockStix = [
        {
            id: '123',
            name: 'bob'
        },
        {
            id: '456',
            name: 'jim'
        },
        {
            id: '789',
            name: 'fred'
        },
    ];

    beforeEach(async(() => {
      TestBed
          .configureTestingModule({
              declarations: [ 
                  SelectionListComponent,
                  FieldSortPipe
              ],
              imports: [        
                  FormsModule,
                  ReactiveFormsModule,
                  BrowserAnimationsModule,
                  MatInputModule,
                  MatListModule,
                  MatCheckboxModule,
              ],
              providers: [
                  ChangeDetectorRef,
              ]
          })
          .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectionListComponent);
        component = fixture.componentInstance;
        component.formCtrl = new FormControl([]);
        component.stix = mockStix;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should hide unselected', () => {
        const checkbox = fixture.nativeElement.querySelector('.mat-checkbox-input');
        expect(checkbox).toBeTruthy();
        checkbox.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    });

});
