import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as UUID from 'uuid';
import * as assessActions from './assess.actions';

import { FetchAssessment, StartAssessment } from './assess.actions';

import { AssessService } from '../services/assess.service';
import { AssessStateService } from '../services/assess-state.service';
import { AssessmentMeta } from '../../models/assess/assessment-meta';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { Capability } from '../../models/stix/capability';
import { Stix } from '../../models/stix/stix';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Assessment3 } from '../../models/assess/assessment3';
import { JsonApi } from '../../models/json/jsonapi';

type URL_TYPE = 'course-of-action' | 'indicator' | 'mitigation' | 'sensor' | 'capability';

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
        .switchMap((meta: Partial<AssessmentMeta>) => {
            const includeMeta = `?metaproperties=true`;
            let url = `${this.generateUrl('capability')}${includeMeta}`;
            const observables = new Array<Observable<Array<JsonApiData<Stix>>>>();

            return Observable.forkJoin(...observables);
        })
        .mergeMap(() => {
            return [
                new assessActions.FinishedLoading(true)
            ];
        });

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
            this.assessStateService.saveCurrent(el);
            return el;
        })
        .do((el: AssessmentMeta) => {
            this.router.navigate([
                '/assess3/wizard/new',
                // 'indicators', el.includesIndicators === true ? 1 : 0,
                // 'mitigations', el.includesMitigations === true ? 1 : 0,
                // 'sensors', el.includesSensors === true ? 1 : 0
            ]);
        })
        // required to send an empty element on non dispatched effects
        .switchMap(() => Observable.of({}));


    @Effect()
    public saveAssessment = this.actions$
        .ofType(assessActions.SAVE_ASSESSMENT)
        .pluck('payload')
        .switchMap((assessments: Assessment3[]) => {
            const rollupIds = assessments
                .map((assessment) => assessment.metaProperties)
                .filter((el) => el !== undefined)
                .map((meta) => meta.rollupId)
                .filter((el) => el !== undefined);
            let rollupId = '';
            if (rollupIds.length > 0) {
                rollupId = rollupIds[0];
            } else {
                rollupId = UUID.v4();
            }

            const observables = assessments
                .map((assessment) => {
                    assessment.metaProperties = assessment.metaProperties || {};
                    assessment.metaProperties.rollupId = rollupId;
                    return assessment;
                })
                .map((assessment) => {
                    const json = { 'data': { 'attributes': assessment } } as JsonApi<JsonApiData<Assessment3>>;
                    let url = 'api/x-unfetter-object-assessments';
                    if (assessment.id) {
                        url = `${url}/${assessment.id}`;
                        return this.genericServiceApi.patchAs<JsonApiData<Assessment3>[]>(url, json);
                    } else {
                        return this.genericServiceApi.postAs<JsonApiData<Assessment3>[]>(url, json);
                    }
                });
            return Observable.forkJoin(...observables)
                .map((arr: any) => {
                    if (Array.isArray(arr[0])) {
                        return arr;
                    } else {
                        // stoopid hack to handle the fact that update returns a single object, not an array, and drops the metadata
                        arr[0].attributes.metaProperties = { rollupId: rollupId };
                        return [arr];
                    }
                });
        })
        .flatMap((arr: JsonApiData<Assessment3>[][]) => arr)
        .map((arr) => {
            const hasAttributes = arr && arr[0] && arr[0].attributes;
            const hasMetadata = hasAttributes && arr[0].attributes.metaProperties;
            return new assessActions.FinishedSaving({ 
                finished: true, 
                rollupId: hasMetadata ? arr[0].attributes.metaProperties.rollupId : '',
                id: hasAttributes ? arr[0].attributes.id : '',
            });
        })


    /**
    * @description
    *  take a stix object type and determine url to fetch data
    * @param {string} type
    *  string in the form of a url path
    */
    private generateUrl(type: URL_TYPE): string {
        let url = Constance.X_UNFETTER_ASSESSMENT3_URL;
        return url;
    }

}
