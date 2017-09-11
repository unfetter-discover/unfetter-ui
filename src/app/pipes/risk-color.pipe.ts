import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'riskColor'})
export class RiskColorPipe implements PipeTransform {

    public transform(risk: number): string {
        const redValue = Math.floor(risk * 255);
        const greenValue = Math.floor((1 - risk) * 255);
        const color = 'rgb(' + redValue + ',' + greenValue + ',0)';
        return color;
    }
}
