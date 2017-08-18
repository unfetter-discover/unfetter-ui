import { Component, Input } from '@angular/core';
import { Constance } from '../../../utils/constance';

@Component({
    selector: 'risk-icon',
    styleUrls: ['risk-icon.component.css'],
    templateUrl: 'risk-icon.component.html',
})

export class RiskIcon {
    @Input('risk') risk: number;
    @Input('showTooltip') showTooltip: boolean = false;
    @Input('tooltipPlacement') tooltipPlacement: String = 'after';

    public getRiskColor(avgRisk) {
        let riskHsl: any = {};

        let green = Constance.COLORS.greenHsl;
        let red = Constance.COLORS.redHsl;

        let hueDelta = green.h - red.h;
        riskHsl.h = green.h - hueDelta * avgRisk;
        let saturationDelta = red.s - green.s;
        riskHsl.s = green.h + saturationDelta * avgRisk;
        let lightnessDelta = red.l - green.l;
        riskHsl.l = green.l + lightnessDelta * avgRisk;

        return `hsla(${riskHsl.h}, ${riskHsl.s}%, ${riskHsl.l}%, 1)`;
    }
}