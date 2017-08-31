import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Risk } from './risk';
import { Constance } from '../../utils/constance';

@Injectable()
export class AssessmentsCalculationService {

    public barColors: any = [
        {
            backgroundColor: Constance.MAT_COLORS['lightblue']['800']
        },
        {
            backgroundColor: Constance.MAT_COLORS['lightblue']['100']
        }
    ];

    // tslint:disable-next-line:no-empty
    constructor() {}

    /**
     * @param risk
     * @return {string} formatted
     */
    public formatRisk(risk): string {
        return Number((risk) * 100).toFixed(2);
    }

    /**
     * calculate risk
     * @param {Risk[]} assessments
     */
    public calculateRisk(assessments: Risk[]): number {
        let risk = 0;
        assessments.forEach((assessment) => {
            if (assessment.risk && typeof assessment.risk === 'number') {
                risk = risk + assessment.risk;
            }
        });
        return risk / assessments.length;
    }

    public getRisk(measureObject: any[]): number {
        let risk = 0;
        let count = 0;
        measureObject.forEach((measurement) => {
            const selectedValue = measurement.selected_value;
            risk = risk + parseFloat(selectedValue.risk);
            count = count + 1;
        });

        return risk / measureObject.length;
    }

    public sophisicationNumberToWord(num: string): string {
        const val = parseInt(num, 10);
        return this.sophisicationValueToWord(val);
    }

    public sophisicationValueToWord(num: number): string {
        switch (num) {
            case 0:
                return 'Novice';
            case 1:
                return 'Practitioner';
            case 2:
                return 'Expert';
            case 3:
                return 'Innovator';
            default:
                return num.toString();
        }
    }

}
