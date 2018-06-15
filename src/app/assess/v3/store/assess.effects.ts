
import { forkJoin as observableForkJoin, empty as observableEmpty, of as observableOf,  Observable  } from 'rxjs';

import { switchMap, pluck,  catchError, flatMap, map, mergeMap, tap  } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Assess3Meta } from 'stix/assess/v3/assess3-meta';
import { Assessment } from 'stix/assess/v3/assessment';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
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

type URL_TYPE = 'course-of-action' | 'indicator' | 'mitigation';

@Injectable()
export class AssessEffects {
  public constructor(
    protected actions$: Actions,
    protected assessService: AssessService,
    protected assessStateService: AssessStateService,
    protected baselineService: BaselineService,
    protected genericServiceApi: GenericApi,
    protected location: Location,
    protected router: Router
  ) { }

  @Effect()
  public fetchAssessmentWizardData = this.actions$
    .ofType(assessActions.LOAD_ASSESSMENT_WIZARD_DATA).pipe(
    pluck('payload'),
    switchMap((meta: Partial<Assess3Meta>) => {
      const includeMeta = `?metaproperties=true`;
      let url = `${this.generateUrl('indicator')}${includeMeta}`;
      const observables = new Array<Observable<Array<Stix> | AssessmentSet>>();

      const indicators$ = meta.includesIndicators
        ? this.genericServiceApi
          .getAs<Indicator.UnfetterIndicator[]>(url).pipe(
          map(RxjsHelpers.mapArrayAttributes))
        : observableOf<Indicator.UnfetterIndicator[]>([]);
      observables.push(indicators$);

      url = `${this.generateUrl('mitigation')}${includeMeta}`;
      const mitigations$ = meta.includesMitigations
        ? this.genericServiceApi
          .getAs<JsonApiData<Stix>[]>(url).pipe(
          map(RxjsHelpers.mapArrayAttributes))
        : observableOf<Stix[]>([]);
      observables.push(mitigations$);

      const capabilitiesQuestions$ = meta.baselineRef
        ? this.baselineService.fetchAssessmentSet(meta.baselineRef)
        : observableOf<AssessmentSet>(new AssessmentSet());
      observables.push(capabilitiesQuestions$);

      return observableForkJoin(...observables).pipe(
        mergeMap(([indicators, mitigations, baseline]) => {
          const actions: Action[] = [
            new assessActions.SetIndicators(indicators as Indicator.UnfetterIndicator[]),
            new assessActions.SetMitigations(mitigations as Stix[]),
            new assessActions.SetCurrentBaseline(baseline as AssessmentSet),
          ];
          const curBaseline = baseline as AssessmentSet;
          if (curBaseline && curBaseline.assessments) {
            // resolve baseline question ids to full questions
            actions.push(new assessActions.LoadCurrentBaselineQuestions(curBaseline));
            // full capabilities needs to look up category names
            actions.push(new assessActions.FetchCapabilities());
          } else {
            actions.push(new assessActions.FinishedLoading(true));
          }
          return actions;
        }),
        catchError((err) => {
          console.log(err);
          return observableOf(new assessActions.FailedToLoad(true));
        })
      );
    }));

  @Effect()
  public fetchObjectAssessments = this.actions$
    .ofType(assessActions.LOAD_CURRENT_BASELINE_QUESTIONS).pipe(
    pluck('payload'),
    switchMap((assessmentSet: AssessmentSet) => {
      // resolve baseline question ids to full questions
      if (!assessmentSet || !assessmentSet.assessments || assessmentSet.assessments.length === 0) {
        return observableOf(new assessActions.FailedToLoad(true));
      }

      return this.baselineService
        .fetchObjectAssessmentsByAssessmentSet(assessmentSet)
        .pipe(
          map((arr) => {
            return new assessActions.SetCurrentBaselineQuestions(arr);
          }),
          catchError((err) => {
            console.log(err);
            return observableOf(new assessActions.FailedToLoad(true));
          })
        );
    }));

  @Effect()
  public fetchAssessment = this.actions$
    .ofType(assessActions.FETCH_ASSESSMENT).pipe(
    switchMap(() => {
      return this.assessService.load().pipe(
        map((arr: any[]) => new assessActions.FetchAssessment(arr[0])),
        catchError((err) => {
          console.log(err);
          return observableOf(new assessActions.FailedToLoad(true));
        })
      );
    }));

  @Effect({ dispatch: false })
  public startAssessment = this.actions$
    .ofType(assessActions.START_ASSESSMENT).pipe(
    pluck('payload'),
    switchMap((meta: Assess3Meta) => {
      return this.assessStateService.saveCurrent(meta)
        .pipe(
          tap((el: Assess3Meta) => {
            let route = [
              '/assess-beta/wizard/new',
              'indicators',
              el.includesIndicators === true ? 1 : 0,
              'mitigations',
              el.includesMitigations === true ? 1 : 0,
            ];
            if (el.baselineRef) {
              route = route.concat('baseline', el.baselineRef);
            }
            this.router.navigate(route);
          }),
          map(() => observableEmpty()),
          catchError((err) => {
            console.log(err);
            return observableEmpty();
          })
        );
    }));

  @Effect()
  public fetchCapabilities = this.actions$
    .ofType(assessActions.FETCH_CAPABILITIES).pipe(
    switchMap(() => {
      // fetch full capability objects, useful for lookups
      return this.baselineService.getCapabilities().pipe(
        mergeMap((arr) => {
          return [
            new assessActions.SetCapabilities(arr),
            new assessActions.FinishedLoading(true)
          ];
        }),
        catchError((err) => {
          console.log(err);
          return observableOf(new assessActions.FailedToLoad(true));
        }));
    }));

  @Effect()
  public saveAssessment = this.actions$
    .ofType(assessActions.SAVE_ASSESSMENT).pipe(
    pluck('payload'),
    switchMap((assessments: Assessment[]) => {
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
          assessment.metaProperties = assessment.metaProperties || {
            published: false,
          };
          assessment.metaProperties.rollupId = rollupId;
          if (assessment.assessmentMeta && assessment.assessmentMeta.baselineRef) {
            assessment.metaProperties.baselineRef = assessment.assessmentMeta.baselineRef;
          }
          return assessment;
        })
        .map((assessment) => {
          const json = {
            data: { attributes: assessment }
          } as JsonApi<JsonApiData<Assessment>>;
          let url = 'api/x-unfetter-assessments';
          if (assessment.id) {
            url = `${url}/${assessment.id}`;
            return this.genericServiceApi
              .patchAs<Assessment[]>(url, json).pipe(
              map<any[], Assessment[]>(RxjsHelpers.mapArrayAttributes));
          } else {
            return this.genericServiceApi
              .postAs<Assessment[]>(url, json).pipe(
              map<any[], Assessment[]>(RxjsHelpers.mapArrayAttributes));
          }
        });

      return observableForkJoin(...observables).pipe(
        map((arr: Assessment[][] | any[]) => {
          if (Array.isArray(arr[0])) {
            return arr;
          } else {
            // hack to handle the fact that an update returns a single object, not an array, and drops the metadata
            arr[0].metaProperties = { rollupId: rollupId };
            return [arr];
          }
        }),
        flatMap((arr: Assessment[][]) => arr),
        map((arr) => {
          const hasMetadata = arr && arr[0] && arr[0].metaProperties;
          return new assessActions.FinishedSaving({
            finished: true,
            rollupId: hasMetadata ? arr[0].metaProperties.rollupId : '',
            id: arr[0].id || '',
          });
        }),
        catchError((err) => {
          console.log(err);
          return observableOf(new assessActions.FailedToLoad(true));
        })
      );
    }));

  @Effect()
  public fetchBaselines = this.actions$
    .ofType(assessActions.LOAD_BASELINES).pipe(
    switchMap(() => {
      return this.baselineService.fetchBaselines().pipe(
        map((arr) => new assessActions.SetBaselines(arr)),
        catchError((err) => {
          console.log(err);
          return observableOf(new assessActions.FailedToLoad(true));
        })
      );
    }));

  /**
   * @description
   *  take a stix object type and determine url to fetch data
   * @param {string} type
   *  string in the form of a url path
   * @returns {string}
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
      default: {
        url = Constance.INDICATOR_URL;
      }
    }
    return url;
  }
}
