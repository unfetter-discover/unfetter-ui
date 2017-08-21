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
        let yellow = Constance.COLORS.yellowHsl;

        if(avgRisk === 0.5 ) {
            riskHsl = yellow;
        } else if(avgRisk < 0.5) {
            // Fade green to yellow
            let hueDelta = green.h - yellow.h;
            riskHsl.h = green.h - hueDelta * avgRisk;
            let saturationDelta = yellow.s - green.s;
            riskHsl.s = green.s + saturationDelta * avgRisk;
            let lightnessDelta = yellow.l - green.l;
            riskHsl.l = green.l + lightnessDelta * avgRisk;
        } else if(avgRisk > 0.5) {
            // Fade yellow to red
            let hueDelta = yellow.h - red.h;
            riskHsl.h = yellow.h - hueDelta * avgRisk;
            let saturationDelta = yellow.s - red.s;
            riskHsl.s = yellow.s - saturationDelta * avgRisk;
            let lightnessDelta = yellow.l - red.l;
            riskHsl.l = yellow.l - lightnessDelta * avgRisk;
        }        

        return `hsla(${parseInt(riskHsl.h)}, ${parseInt(riskHsl.s)}%, ${parseInt(riskHsl.l)}%, 1)`;
    }
}