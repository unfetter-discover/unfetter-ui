import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
