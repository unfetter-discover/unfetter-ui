import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, Validators } from '@angular/forms';

import { PiiCheckMessageComponent } from './pii-check-message.component';

describe('PiiCheckMessageComponent', () => {

    let fixture: ComponentFixture<PiiCheckMessageComponent>;
    let component: PiiCheckMessageComponent;

    const mockValue = new FormControl('name', Validators.required);
    mockValue.setValue('bob');

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [ PiiCheckMessageComponent ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PiiCheckMessageComponent);
        component = fixture.componentInstance;
        component.formCtrl = mockValue;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
