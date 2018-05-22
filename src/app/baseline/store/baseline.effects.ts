import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Category } from 'stix/assess/v3/baseline';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { AttackPatternService } from '../../core/services/attack-pattern.service';
import { GenericApi } from '../../core/services/genericapi.service';
import { Baseline } from '../../models/baseline/baseline';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { BaselineStateService } from '../services/baseline-state.service';
import { BaselineService } from '../services/baseline.service';
import * as assessActions from './baseline.actions';

@Injectable()
export class BaselineEffects {

    public constructor(
        protected actions$: Actions,
        protected attackPatternService: AttackPatternService,
        protected baselineService: BaselineService,
        protected baselineStateService: BaselineStateService,
        protected genericServiceApi: GenericApi,
        protected location: Location,
        protected router: Router,
    ) { }

    @Effect()
    public fetchAssessmentWizardData = this.actions$
        .ofType(assessActions.LOAD_BASELINE_WIZARD_DATA)
        .pluck('payload')
        // .switchMap((meta: Partial<Assessment3Meta>) => {
        //     const includeMeta = `?metaproperties=true`;
        //     let url = `${Constance.X_UNFETTER_ASSESSMENT3_URL}${includeMeta}`;
        //     const observables = new Array<Observable<Array<JsonApiData<Stix>>>>();

        //     return Observable.forkJoin(...observables);
        // })
        .mergeMap(() => {
            return [
                new assessActions.FinishedLoading(true)
            ];
        });

    @Effect()
    public fetchAssessment = this.actions$
        .ofType(assessActions.FETCH_BASELINE)
        .switchMap(() => this.baselineService.load())
        .map((arr: any[]) => new assessActions.FetchBaseline(arr[0]));

    // @Effect()
    // public fetchCapabilityGroups = this.actions$
    //     .ofType(assessActions.FETCH_CAPABILITY_GROUPS)
    //     .switchMap(() => this.baselineService.getCategories())
    //     .map((arr: Category[]) => new assessActions.SetCapabilityGroups(arr));

    // @Effect()
    // public fetchCapabilities = this.actions$
    //     .ofType(assessActions.FETCH_CAPABILITIES)
    //     .switchMap(() => this.baselineService.getCapabilities())
    //     .map((arr: Category[]) => new assessActions.SetCapabilities(arr));

    //     @Effect()
    //     public fetchAttackPatterns = this.actions$
    //         .ofType(assessActions.FETCH_ATTACK_PATTERNS)
    //         .pluck('payload')
    //         .switchMap((selectedFramework: string) => {
    //             const o1$ = Observable.of(selectedFramework);
    //             // select all the attack patterns
    //             const o2$ = this.attackPatternService
    //                 .fetchAttackPatterns()
    //                 .catch((ex) => Observable.of([] as AttackPattern[]));
    //             // merge selected framework and all system attack patterns                
    //             return Observable.forkJoin(o1$, o2$);
    //         })
    //         .mergeMap(([framework, allAttackPatterns]) => {
    //             // if no framework given, use all attack patterns
    //             let selectedAttackPatterns = allAttackPatterns;
    //             if (framework) {
    //                 // filter if we are given a selected framework
    //                 const isFromSelectedFramework = (el) => {
    //                     return el 
    //                         && el.kill_chain_phases
    //                         .findIndex((_) => _.kill_chain_name === framework) > -1;
    //                 };
    //                 selectedAttackPatterns = allAttackPatterns
    //                     .filter(isFromSelectedFramework);
    //             }
    
    //             // tell reducer to set the attack pattern states
    //             return [
    //                 new assessActions.SetAttackPatterns(allAttackPatterns),
    //                 new assessActions.SetSelectedFrameworkAttackPatterns(selectedAttackPatterns),
    //             ];
    //         });
    
    @Effect({ dispatch: false })
    public startAssessment = this.actions$
        .ofType(assessActions.START_BASELINE)
        .pluck('payload')
        .map((el: BaselineMeta) => {
            this.baselineStateService.saveCurrent(el);
            return el;
        })
        .do((el: BaselineMeta) => {
            this.router.navigate([
                '/baseline/wizard/new'
            ]);
        })
        // required to send an empty element on non dispatched effects
        .switchMap(() => Observable.of({}));


    @Effect()
    public saveAssessment = this.actions$
        .ofType(assessActions.SAVE_BASELINE)
        .pluck('payload')
        .switchMap((baselines: Baseline[]) => {
            // const rollupIds = baselines
            //     .map((baseline) => baseline.metaProperties)
            //     .filter((el) => el !== undefined)
            //     .map((meta) => meta.rollupId)
            //     .filter((el) => el !== undefined);
            // let rollupId = '';
            // if (rollupIds.length > 0) {
            //     rollupId = rollupIds[0];
            // } else {
            //     rollupId = UUID.v4();
            // }

            const observables = baselines
                // .map((baseline) => {
                //     baseline.metaProperties = baseline.metaProperties || {};
                //     baseline.metaProperties.rollupId = rollupId;
                //     return baseline;
                // })
                .map((baseline) => {
                    const json = { 'data': { 'attributes': baseline } } as JsonApi<JsonApiData<Baseline>>;
                    let url = 'api/x-unfetter-object-baselines';
                    if (baseline.id) {
                        url = `${url}/${baseline.id}`;
                        return this.genericServiceApi.patchAs<JsonApiData<Baseline>[]>(url, json);
                    } else {
                        return this.genericServiceApi.postAs<JsonApiData<Baseline>[]>(url, json);
                    }
                });
            return Observable.forkJoin(...observables)
                .map((arr: any) => {
                    // if (Array.isArray(arr[0])) {
                    //     return arr;
                    // } else {
                    //     // stoopid hack to handle the fact that update returns a single object, not an array, and drops the metadata
                    //     arr[0].attributes.metaProperties = { rollupId: rollupId };
                        return [arr];
                    // }
                });
        })
        .flatMap((arr: JsonApiData<Baseline>[][]) => arr)
        .map((arr) => {
            const hasAttributes = arr && arr[0] && arr[0].attributes;
            const hasMetadata = hasAttributes && arr[0].attributes.metaProperties;
            return new assessActions.FinishedSaving({ 
                finished: true, 
                id: hasAttributes ? arr[0].attributes.id : '',
            });
        })

}
