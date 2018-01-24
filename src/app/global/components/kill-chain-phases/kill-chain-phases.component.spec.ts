import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { KillChainPhasesReactiveComponent } from './kill-chain-phases.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { ConfigService } from '../../../core/services/config.service';
import { mockConfigService } from '../../../testing/mock-config-service';

describe('KillChainPhasesReactiveComponent', () => {
    let component: KillChainPhasesReactiveComponent;
    let fixture: ComponentFixture<KillChainPhasesReactiveComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                KillChainPhasesReactiveComponent,
                CapitalizePipe
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatButtonModule,
                MatInputModule,
                MatAutocompleteModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: ConfigService, useValue: mockConfigService },
                ChangeDetectorRef
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KillChainPhasesReactiveComponent);
        component = fixture.componentInstance;
        component.parentForm = new FormGroup({
            kill_chain_phases: new FormArray([])
        })
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add kill chains to the parent form', () => {
        fixture.detectChanges();
        component.localForm.setValue({
            kill_chain_name: 'mitre-attack',
            phase_name: 'persistence'
        });
        component.addToParent();
        expect(component.parentForm.get('kill_chain_phases').value.length).toBeTruthy();
    });
});
