import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Assess3Meta } from 'stix/assess/v3/assess3-meta';
import { Assessment } from 'stix/assess/v3/assessment';
import { JsonApi } from 'stix/json/jsonapi';
import { JsonApiData } from 'stix/json/jsonapi-data';
import * as Indicator from 'stix/unfetter/indicator';
import { Stix } from 'stix/unfetter/stix';
import * as UUID from 'uuid';
import { BaselineService } from '../../../baseline/services/baseline.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { RxjsHelpers } from '../../../global/static/rxjs-helpers';
import { Constance } from '../../../utils/constance';
import { AssessStateService } from '../services/assess-state.service';
import { AssessService } from '../services/assess.service';
import * as assessActions from './assess.actions';

type URL_TYPE = 'course-of-action' | 'indicator' | 'mitigation' | 'sensor';

@Injectable()
export class AssessEffects {

    public constructor(
        protected actions$: Actions,
        protected assessService: AssessService,
        protected assessStateService: AssessStateService,
        protected baselineService: BaselineService,
        protected genericServiceApi: GenericApi,
        protected location: Location,
        protected router: Router,
    ) { }

    @Effect()
    public fetchAssessmentWizardData = this.actions$
        .ofType(assessActions.LOAD_ASSESSMENT_WIZARD_DATA)
        .pluck('payload')
        .switchMap((meta: Partial<Assess3Meta>) => {
            const includeMeta = `?metaproperties=true`;
            let url = `${this.generateUrl('indicator')}${includeMeta}`;
            const observables = new Array<Observable<Array<Stix>>>();

            const indicators$ = meta.includesIndicators ?
                this.genericServiceApi
                    .getAs<Indicator.UnfetterIndicator[]>(url)
                    .map(RxjsHelpers.mapArrayAttributes)
                : Observable.of<Indicator.UnfetterIndicator[]>([]);
            observables.push(indicators$);

            url = `${this.generateUrl('mitigation')}${includeMeta}`;
            const mitigations$ = meta.includesMitigations ?
                this.genericServiceApi
                    .getAs<JsonApiData<Stix>[]>(url)
                    .map(RxjsHelpers.mapArrayAttributes)
                : Observable.of<Stix[]>([]);
            observables.push(mitigations$);

            // TODO: change this to pulling the baseline assessment_sets
            // url = `${this.generateUrl('sensor')}${includeMeta}`;
            // const sensors$ = meta.includesSensors ?
            //     this.genericServiceApi.getAs<JsonApiData<Stix>[]>(url) :
            //     Observable.of<JsonApiData<Stix>[]>([]);
            // observables.push(sensors$);

            return Observable.forkJoin(...observables)
                .mergeMap(([indicators, mitigations]) => {
                    return [
                        new assessActions.IndicatorsLoaded(indicators as Indicator.UnfetterIndicator[]),
                        new assessActions.MitigationsLoaded(mitigations),
                        // new assessActions.SensorsLoaded(sensors),
                        new assessActions.FinishedLoading(true)
                    ];
                })
                .catch((err) => {
                    console.log(err);
                    return Observable.empty();
                });
        });

    @Effect()
    public fetchAssessment = this.actions$
        .ofType(assessActions.FETCH_ASSESSMENT)
        .switchMap(() => {
            return this.assessService
                .load()
                .map((arr: any[]) => new assessActions.FetchAssessment(arr[0]))
                .catch((err) => {
                    console.log(err);
                    return Observable.empty();
                });
        });

    @Effect({ dispatch: false })
    public startAssessment = this.actions$
        .ofType(assessActions.START_ASSESSMENT)
        .pluck('payload')
        .map((el: Assess3Meta) => {
            this.assessStateService.saveCurrent(el);
            return el;
        })
        .do((el: Assess3Meta) => {
            this.router.navigate([
                '/assess-beta/wizard/new',
                'indicators', el.includesIndicators === true ? 1 : 0,
                'mitigations', el.includesMitigations === true ? 1 : 0,
                'baselineRef', el.baselineRef ? el.baselineRef : ''
            ]);
        })
        // required to send an empty element on non dispatched effects
        .switchMap(() => Observable.of({}));


    @Effect()
    public saveAssessment = this.actions$
        .ofType(assessActions.SAVE_ASSESSMENT)
        .pluck('payload')
        .switchMap((assessments: Assessment[]) => {
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
                    assessment.metaProperties = assessment.metaProperties || { published: false };
                    assessment.metaProperties.rollupId = rollupId;
                    return assessment;
                })
                .map((assessment) => {
                    const json = { 'data': { 'attributes': assessment } } as JsonApi<JsonApiData<Assessment>>;
                    let url = 'api/x-unfetter-assessments';
                    if (assessment.id) {
                        url = `${url}/${assessment.id}`;
                        return this.genericServiceApi
                            .patchAs<Assessment[]>(url, json)
                            .map(RxjsHelpers.mapArrayAttributes);
                    } else {
                        return this.genericServiceApi
                            .postAs<Assessment[]>(url, json)
                            .map(RxjsHelpers.mapArrayAttributes);
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
                })
                .flatMap((arr: JsonApiData<Assessment>[][]) => arr)
                .map((arr) => {
                    const hasAttributes = arr && arr[0] && arr[0].attributes;
                    const hasMetadata = hasAttributes && arr[0].attributes.metaProperties;
                    return new assessActions.FinishedSaving({
                        finished: true,
                        rollupId: hasMetadata ? arr[0].attributes.metaProperties.rollupId : '',
                        id: hasAttributes ? arr[0].attributes.id : '',
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return Observable.empty();
                });
        });

    @Effect()
    public fetchCapabilites = this.actions$
        .ofType(assessActions.LOAD_BASELINES)
        .switchMap(() => {
            return this.baselineService
                .fetchBaselines()
                .map((arr) => new assessActions.SetBaselines(arr))
                .catch((err) => {
                    console.log(err);
                    return Observable.empty();
                });
        });


    /**
    * @description
    *  take a stix object type and determine url to fetch data
    * @param {string} type
    *  string in the form of a url path
    */
    private generateUrl(type: URL_TYPE): string {
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

}
