import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import {
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';

import { SummaryReportComponent } from './summary-report.component';
import { SummaryTacticsComponent } from './summary-tactics/summary-tactics.component';
import { SummaryCalculationService } from '../summary-calculation.service';
import { CapitalizePipe } from '../../../../global/pipes/capitalize.pipe';
import { reducers } from '../../../../root-store/app.reducers';

describe('SummaryReportComponent', () => {

    let fixture: ComponentFixture<SummaryReportComponent>;
    let component: SummaryReportComponent;

    const serviceMock = {
        baseline: {
            assessments: [],
        },
        blGroups: [],
        blAttackPatterns: [],
        baselineWeightings: {
            protPct: .25,
            detPct: .50,
            respPct: .75,
        },
        totalWeightings: 10,
    };

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatCardModule,
                    MatTableModule,
                    MatTooltipModule,
                    ChartsModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    SummaryReportComponent,
                    SummaryTacticsComponent,
                    CapitalizePipe,
                ],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    {
                        provide: SummaryCalculationService,
                        useValue: serviceMock
                    }
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SummaryReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
