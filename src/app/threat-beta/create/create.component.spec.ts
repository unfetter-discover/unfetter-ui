import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { FormsModule } from '@angular/forms';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
} from '@angular/material';

import { CreateComponent } from './create.component';
import { LoadingSpinnerComponent } from '../../global/components/loading-spinner/loading-spinner.component';
import { ThreatDashboardBetaService } from '../threat-beta.service';
import MockThreatDashboardBetaService from '../testing/mock-threat.service';
import { threatReducer } from '../store/threat.reducers';
import { GenericApi } from '../../core/services/genericapi.service';

fdescribe('CreateComponent', () => {

    let fixture: ComponentFixture<CreateComponent>;
    let component: CreateComponent;

    const mockRouter = {
        navigate: (paths: string[]) => { },
    }

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    FormsModule,
                    MatIconModule,
                    MatFormFieldModule,
                    MatDatepickerModule,
                    MatSelectModule,
                    MatOptionModule,
                    MatChipsModule,
                    MatProgressSpinnerModule,
                    StoreModule.forRoot(threatReducer),
                    HttpClientTestingModule,
                ],
                declarations: [
                    CreateComponent,
                    LoadingSpinnerComponent,
                ],
                providers: [
                    GenericApi,
                    { provide: Router, useValue: mockRouter },
                    { provide: ActivatedRoute, useValue: { snapshot: { routeConfig: { path: 'create' } } } },
                    { provide: Location, useValue: { back: () => { } } },
                    { provide: ThreatDashboardBetaService, useValue: MockThreatDashboardBetaService },
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
