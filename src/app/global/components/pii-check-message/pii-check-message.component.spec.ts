import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiiCheckMessageComponent } from './pii-check-message.component';
import { WebWorkerService } from '../../../core/services/web-worker.service';
import { Subject } from 'rxjs';

describe('PiiCheckMessageComponent', () => {

    let fixture: ComponentFixture<PiiCheckMessageComponent>;
    let component: PiiCheckMessageComponent;

    const mockValue = new FormControl('name', Validators.required);
    mockValue.setValue('bob');

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [ PiiCheckMessageComponent ],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    {
                        provide: WebWorkerService,
                        useValue: {
                            generateClient() { 
                                return {
                                    connect() {
                                        return new Subject();
                                    },
                                    sendMessage() { }
                                };
                            }                   
                        }
                    }
                ]
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
