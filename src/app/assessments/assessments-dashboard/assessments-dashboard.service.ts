import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance';

@Injectable()
export class AssessmentsDashboardService {
    public baseUrl = Constance.X_UNFETTER_ASSESSMENT_URL;
    public relationshipsUrl = Constance.RELATIONSHIPS_URL;
    constructor(private genericApi: GenericApi) { }

    public getById(id: string): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/${id}`);
    }

    public getRiskByAttackPattern(id: string): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/${id}/risk-by-attack-pattern`);
    }

    public getAssessedObjects(id: string): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/${id}/assessed-objects`);
    }

    public getAttackPatternRelationships(id: string): Observable<any> {
        let query = { 'stix.target_ref': id, 'stix.relationship_type': { $in: ['mitigates', 'indicates'] } };
        return this.genericApi.get(`${this.relationshipsUrl}?filter=${encodeURI(JSON.stringify(query))}`);
    }

    public genericGet(route: string) {
        return this.genericApi.get(route);
    }

    public genericPost(route: string, data: any) {
        return this.genericApi.post(route, {'data':{'attributes': data}});
    }

    public genericPatch(route: string, data: any) {
        return this.genericApi.patch(route, {'data':{'attributes': data}});
    }
}
