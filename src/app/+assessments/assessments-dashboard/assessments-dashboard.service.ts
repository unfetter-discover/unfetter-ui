import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance'

@Injectable()
export class AssessmentsDashboardService {
    baseUrl: String = Constance.X_UNFETTER_ASSESSMENT_URL; 
    constructor(private genericApi: GenericApi) { }

    public getById(id: String): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/${id}`);
    }

    public getRiskByAttackPattern(id: String): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/${id}/risk-by-attack-pattern`);
    }
}