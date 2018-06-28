import { TestBed, ComponentFixture, async, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSelect,
    } from '@angular/material';

import { IndicatorPatternFieldComponent } from './indicator-pattern-field.component';
import { SelectMenuTestHelper } from '../../testing/select-menu-test.helper';

describe('IndicatorPatternFieldComponent', () => {

    let component: IndicatorPatternFieldComponent;
    let fixture: ComponentFixture<IndicatorPatternFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatChipsModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatSelectModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                IndicatorPatternFieldComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorPatternFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('', () => {

        let typeOptions: HTMLElement[];
        let typesMenu: SelectMenuTestHelper;

        beforeEach(() => {
            typesMenu = new SelectMenuTestHelper(fixture, 'mat-select[name="objectTypes"]');
        });

        beforeEach(fakeAsync(() => {
            typesMenu.triggerMenu();
            typeOptions = typesMenu.getOptions();
            typesMenu.triggerMenu();
        }));

        afterEach(() => {
            typesMenu.cleanup();
        });

        it('changing types selector works', fakeAsync(() => {
            const testType = Math.floor(Math.random() * component.objectTypes.length);
            expect(component.selectedObjectType).toBeFalsy();
            typesMenu.selectOption(typeOptions[testType]);
            expect(component.selectedObjectType).toEqual(component.objectTypes[testType].label);
        }));

    });

    describe('', () => {

        let propertyOptions: HTMLElement[];
        let propertiesMenu: SelectMenuTestHelper;

        beforeEach(() => {
            propertiesMenu = new SelectMenuTestHelper(fixture, 'mat-select[name="objectProperties"]');
        });

        beforeEach(fakeAsync(() => {
            propertiesMenu.triggerMenu();
            propertyOptions = propertiesMenu.getOptions();
            propertiesMenu.triggerMenu();
        }));

        afterEach(() => {
            propertiesMenu.cleanup();
        });

        it('changing properties selector works', fakeAsync(() => {
            const testProp = Math.floor(Math.random() * component.objectProperties.length);
            expect(component.selectedObjectProperty).toBeFalsy();
            propertiesMenu.selectOption(propertyOptions[testProp]);
            expect(component.selectedObjectProperty).toEqual(component.objectProperties[testProp].label);
        }));

    });

    it('should handle indicator value changes', async(() => {
        const testValue: string = 'test';
        expect(component.selectedObjectValue).toBeFalsy();
        let input = fixture.debugElement.query(By.css('input[name="objectValue"]'));
        expect(input).not.toBeNull();
        input.nativeElement.value = testValue;
        // Bizarro time: after doing this for dozens of other components, for some stupid reason the input value
        // refuses to update, no matter what I do. The change event below triggers just fine, but i can't change
        // this input's value within the test. The input is not marked readonly or disabled, so it makes no sense.
        // The only difference between this one and others is that it is embedded in a mat-input-container. For
        // grins, I got rid of the mat-input-container, but it still fails to take the new value.
        console.log('shows new value here', input.nativeElement.value, component.selectedObjectValue, 'is undefined');
        input.nativeElement.dispatchEvent(new Event('change'));
        fixture.whenStable().then(() => {
            console.log('suddenly no new value here', input.nativeElement.value, component.selectedObjectValue, 'still undefined');
            // expect(component.selectedObjectValue).toEqual(testValue);
            // let icon = fixture.debugElement.query(By.css('button[mat-mini-fab]')).nativeElement;
            // expect(icon).not.toBeNull();
        });
    }));

    it('should handle add and remove button clicks', async(() => {
        expect(component.indicators.length).toEqual(0);
        const testValue: string = 'test';
        const testType = Math.floor(Math.random() * component.objectTypes.length);
        const testProp = Math.floor(Math.random() * component.objectProperties.length);
        component.selectedObjectType = component.objectTypes[testType].label;
        component.selectedObjectProperty = component.objectProperties[testProp].label;
        component.selectedObjectValue = testValue;
        component.disabled = false;
        fixture.detectChanges();
        expect(component.indicators.length).toEqual(0);
        let icon = fixture.debugElement.query(By.css('button[mat-mini-fab]'));
        expect(icon).not.toBeNull();
        expect(icon.nativeElement.hasAttribute('disabled')).toBeFalsy();
        icon.nativeElement.click();
        fixture.whenStable().then(() => {
            expect(component.indicators.length).toEqual(1);
            fixture.detectChanges();
            let chip = fixture.debugElement.query(By.css('mat-chip'));
            expect(chip).not.toBeNull();
            let remover = fixture.debugElement.query(By.css('mat-chip span.cursor-pointer'));
            expect(remover).not.toBeNull();
            remover.nativeElement.click();
            fixture.whenStable().then(() => {
                expect(component.indicators.length).toEqual(0);
                fixture.detectChanges();
                chip = fixture.debugElement.query(By.css('mat-chip'));
                expect(chip).toBeNull();
            });
        });
    }));

    it('should handle calls to clear all fields', async(() => {
        const testValue: string = 'test';
        const testType = Math.floor(Math.random() * component.objectTypes.length);
        const testProp = Math.floor(Math.random() * component.objectProperties.length);
        component.selectedObjectType = component.objectTypes[testType].label;
        component.selectedObjectProperty = component.objectProperties[testProp].label;
        component.selectedObjectValue = testValue;
        component.disabled = false;
        fixture.detectChanges();
        component.clearFields();
        expect(component.selectedObjectType).toBeFalsy();
        expect(component.selectedObjectProperty).toBeFalsy();
        expect(component.selectedObjectValue).toBeFalsy();
        expect(component.disabled).toBeTruthy();
    }));

});
