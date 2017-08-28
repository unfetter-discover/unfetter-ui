import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Risk } from './risk';

@Injectable()
export class AssessmentsCalculationService {

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
            let selected_value = measurement.selected_value;
            risk = risk + parseFloat(selected_value.risk);
            count = count + 1;
        });

        return risk / measureObject.length;
    }

    public sophisicationNumberToWord(number: any): string {
        switch (parseInt(number)) {
            case 0:
                return 'Novice';
            case 1:
                return 'Practitioner';
            case 2:
                return 'Expert';
            case 3:
                return 'Innovator';
            default:
                return number;
        }
    }
}
