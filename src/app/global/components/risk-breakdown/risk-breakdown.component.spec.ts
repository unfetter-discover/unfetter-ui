import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { MatTooltipModule } from '@angular/material';

import { RiskBreakdownComponent } from './risk-breakdown.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

describe('RiskBreakdownComponent', () => {

    let fixture: ComponentFixture<RiskBreakdownComponent>;
    let component: RiskBreakdownComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    RiskBreakdownComponent,
                    CapitalizePipe,
                ],
                imports: [
                    MatTooltipModule,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RiskBreakdownComponent);
        component = fixture.componentInstance;
        component.riskBreakdown = {
            status: .8
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
