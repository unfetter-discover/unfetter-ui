import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { MatTooltipModule } from '@angular/material';

import { RiskIconComponent } from './risk-icon.component';

describe('RiskIconComponent', () => {

    let fixture: ComponentFixture<RiskIconComponent>;
    let component: RiskIconComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    RiskIconComponent,
                ],
                imports: [
                    MatTooltipModule,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RiskIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show high risk', () => {
        component.showTooltip = true;
        component.risk = .75;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const risk = fixture.nativeElement.querySelector('.riskIcon .material-icons');
            expect(risk).toBeDefined();
            expect(risk.style.color).toEqual('rgb(247, 106, 54)');
        });
    });

    it('should show average risk', () => {
        component.showTooltip = true;
        component.risk = .5;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const risk = fixture.nativeElement.querySelector('.riskIcon .material-icons');
            expect(risk).toBeDefined();
            expect(risk.style.color).toEqual('rgb(255, 236, 61)');
        });
    });

    it('should show low risk', () => {
        component.showTooltip = true;
        component.risk = .25;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const risk = fixture.nativeElement.querySelector('.riskIcon .material-icons');
            expect(risk).toBeDefined();
            expect(risk.style.color).toEqual('rgb(100, 199, 67)');
        });
    });

});
