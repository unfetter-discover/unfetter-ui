import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of as observableOf, Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import { SelectSearchFieldComponent } from './select-search-field.component';
import { BaseComponentService } from '../base-service.component';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';

describe('SelectSearchFieldComponent', () => {

    let component: SelectSearchFieldComponent;
    let fixture: ComponentFixture<SelectSearchFieldComponent>;
    let subscriptions: Subscription[];

    beforeEach(async(() => {
        subscriptions = [];

        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatAutocompleteModule,
                MatFormFieldModule,
                BrowserAnimationsModule,
                HttpClientModule,
                HttpClientTestingModule,
            ],
            declarations: [
                SelectSearchFieldComponent,
            ],
            providers: [
                GenericApi,
                BaseComponentService,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectSearchFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        if (subscriptions) {
            subscriptions
                .filter((sub) => sub !== undefined)
                .filter((sub) => !sub.closed)
                .forEach((sub) => sub.unsubscribe());
        }
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should autocomplete', async(() => {
        component.options = [
            { id: 't1', attributes: { name: 'test1' } },
            { id: 't2', attributes: { name: 'Terminator 2' } },
            { id: 't3', attributes: { name: 'TEST all caps' } },
        ];
        fixture.detectChanges();

        // const input = fixture.debugElement.query(By.css('input[matInput]'));
        // expect(input).not.toBeNull();
        // input.nativeElement.value = 'test';
        component.formCtrl.setValue('test');
        fixture.whenStable().then(() => {
            // console.log(component.inputFieldValue, component.filteredOptions, component.options);
            // ??? Can't trigger the autocomplete
        });
    }));

});
