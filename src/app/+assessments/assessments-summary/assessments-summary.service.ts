import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance';

@Injectable()
export class AssessmentsSummaryService {
    public baseUrl: String = Constance.X_UNFETTER_ASSESSMENT_URL;
    constructor(private genericApi: GenericApi) { }

    public getById(id: String): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/${id}`);
    }

<<<<<<< 3785c6b885c1506af9e445b70d5c282404638dca
    public getRiskPerKillChain(id: string): Observable<any> {
        if (!id) {
            return Observable.empty();
        }

        const url = `api/x-unfetter-assessments/${id}/risk-per-kill-chain`;
        return this.genericApi.get(url);
    }

    public getRiskPerAttackPattern(id: string): Observable<any> {
        if (!id) {
            return Observable.empty();
        }

        const url = `api/x-unfetter-assessments/${id}/risk-by-attack-pattern`;
        return this.genericApi.get(url);
    }

=======
>>>>>>> issue #332 router for assessments summary page
}
