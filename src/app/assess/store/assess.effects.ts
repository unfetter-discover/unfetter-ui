import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as assessActions from './assess.actions';

import { FetchAssessment, StartAssessment } from './assess.actions';

import { AssessService } from '../services/assess.service';
import { AssessStateService } from '../services/assess-state.service';
import { AssessmentMeta } from '../../models/assess/assessment-meta';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { Indicator } from '../../models/stix/indicator';
import { Sensor } from '../../models/unfetter/sensor';
import { Stix } from '../../models/stix/stix';

@Injectable()
export class AssessEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected assessService: AssessService,
        protected assessStateService: AssessStateService,
        protected genericServiceApi: GenericApi
    ) { }

    @Effect()
    public fetchAssessmentWizardData = this.actions$
        .ofType(assessActions.LOAD_ASSESSMENT_WIZARD_DATA)
        .pluck('payload')
        .switchMap((meta: AssessmentMeta) => {
            const urlTemplate = this.template`${0}?metaproperties=true`;
            const observables = new Array<Observable<Array<Stix>>>();
            if (meta.includesIndicators) {
                const url = urlTemplate(this.generateUrl('indicator'));
                const indicators$ = this.genericServiceApi.getAs<Indicator[]>(url);
                observables.push(indicators$);
            }
            if (meta.includesMitigations) {
                const url = urlTemplate(this.generateUrl('mitigation'));
                console.log(url);
                const mitigations$ = this.genericServiceApi.getAs<Stix[]>(url);
            }
            if (meta.includesSensors) {
                const url = urlTemplate(this.generateUrl('sensor'));
                const sensors$ = this.genericServiceApi.getAs<Stix[]>(url);
            }

            return Observable.forkJoin(...observables);
        })
        .mergeMap(([indicators, mitigations, sensors]) => [
            new assessActions.IndicatorsLoaded(indicators as Indicator[]),
            new assessActions.MitigationsLoaded(mitigations),
            new assessActions.SensorsLoaded(sensors),
            new assessActions.FinishedLoading(true)
        ]);

    @Effect()
    public fetchAssessment = this.actions$
        .ofType(assessActions.FETCH_ASSESSMENT)
        .switchMap(() => this.assessService.load())
        .map((arr: any[]) => new assessActions.FetchAssessment(arr[0]));

    @Effect({ dispatch: false })
    public startAssessment = this.actions$
        .ofType(assessActions.START_ASSESSMENT)
        .pluck('payload')
        .map((el: AssessmentMeta) => {
            console.log('in assess effects ', assessActions.START_ASSESSMENT, el);
            return this.assessStateService.saveCurrent(el);
        })
        .do(() => {
            console.log('routing to new wizard');
            this.router.navigate(['/assess/wizard/new']);
        })
        // required to send an empty element on non dispatched effects
        .switchMap(() => Observable.of({}));


    /**
    * @description
    *  take a stix object type and determine url to fetch data
    * @param {string} type
    *  string in the form of a url path
    *  [keyof { 'course-of-action', 'indicator', 'mitigation', 'sensor'}]
    */
    private generateUrl(type = ''): string {
        let url = '';
        switch (type) {
            case 'indicator': {
                url = Constance.INDICATOR_URL;
                break;
            }
            case 'mitigation': {
                url = Constance.COURSE_OF_ACTION_URL;
                break;
            }
            case 'course-of-action': {
                url = Constance.COURSE_OF_ACTION_URL;
                break;
            }
            case 'sensor': {
                url = 'api/x-unfetter-sensors';
                break;
            }
            default: {
                url = 'api/x-unfetter-sensors';
            }
        }
        return url;
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
     * @param strings 
     * @param keys 
     */
    private template(strings, ...keys) {
        return ((...values) => {
            const dict = values[values.length - 1] || {};
            const result = [strings[0]];
            keys.forEach((key, i) => {
                const value = Number.isInteger(key) ? values[key] : dict[key];
                result.push(value, strings[i + 1]);
            });
            return result.join('');
        });
    }
}
