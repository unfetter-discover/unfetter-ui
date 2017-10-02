import { Component, Input } from '@angular/core';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'risk-icon',
  styleUrls: ['risk-icon.component.scss'],
  templateUrl: 'risk-icon.component.html'
})
export class RiskIconComponent {
  @Input('risk') public risk: number;
  @Input('showTooltip') public showTooltip = false;
  @Input('tooltipPlacement') public tooltipPlacement = 'after';
  
  public getRiskColor(avgRisk) {
    let riskHsl: any = {};

    const green = Constance.COLORS.greenHsl;
    const red = Constance.COLORS.redHsl;
    const yellow = Constance.COLORS.yellowHsl;

    if (avgRisk === 0.5) {
      riskHsl = yellow;
    } else if (avgRisk < 0.5) {
      // Fade green to yellow
      const hueDelta = green.h - yellow.h;
      riskHsl.h = green.h - hueDelta * avgRisk;
      const saturationDelta = yellow.s - green.s;
      riskHsl.s = green.s + saturationDelta * avgRisk;
      const lightnessDelta = yellow.l - green.l;
      riskHsl.l = green.l + lightnessDelta * avgRisk;
    } else if (avgRisk > 0.5) {
      // Fade yellow to red
      const hueDelta = yellow.h - red.h;
      riskHsl.h = yellow.h - hueDelta * avgRisk;
      const saturationDelta = yellow.s - red.s;
      riskHsl.s = yellow.s - saturationDelta * avgRisk;
      const lightnessDelta = yellow.l - red.l;
      riskHsl.l = yellow.l - lightnessDelta * avgRisk;
    }

    return `hsla(${parseInt(riskHsl.h, 10 )}, ${parseInt(riskHsl.s, 10)}%, ${parseInt(
      riskHsl.l, 10)}%, 1)`;
  }
}
