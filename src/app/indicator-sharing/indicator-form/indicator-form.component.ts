import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { of as observableOf, forkJoin as observableForkJoin, Observable, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, pluck, finalize, take, withLatestFrom, map, filter, share, tap, skip } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatStep, MatStepper, MatHorizontalStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { IndicatorForm, SigmaQueryForm } from '../../global/form-models/indicator';
import { IndicatorSharingService } from '../indicator-sharing.service';
import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { AuthService } from '../../core/services/auth.service';
import { heightCollapse } from '../../global/animations/height-collapse';
import { PatternHandlerTranslateAll, PatternHandlerGetObjects, PatternHandlerPatternObject } from '../../global/models/pattern-handlers';
import { patternHelp, observableDataHelp } from '../help-templates';
import { cleanObjectProperties } from '../../global/static/clean-object-properties';
import { ExternalReferencesForm } from '../../global/form-models/external-references';
import { KillChainPhasesForm } from '../../global/form-models/kill-chain-phases';
import { FormatHelpers } from '../../global/static/format-helpers';
import { GenericApi } from '../../core/services/genericapi.service';
import { GridFSFile } from '../../global/models/grid-fs-file';
import { MasterConfig } from '../../core/services/run-config.service';
import { MarkingDefinition } from '../../models';
import MarkingDefinitionHelpers from '../../global/static/marking-definition-helper';
import { HideFooter, NavigateToErrorPage } from '../../root-store/utility/utility.actions';
import { AdditionalQueriesForm } from '../../global/form-models/additional-queries';
import { DomHelper } from '../../global/static/dom-helper';
import { Identity } from 'stix';
import { getPreferredKillchainAttackPatterns } from '../../root-store/stix/stix.selectors';
import { SigmaTranslations } from '../../global/models/sigma-translation';

@Component({
  selector: 'indicator-form',
  templateUrl: './indicator-form.component.html',
  styleUrls: ['./indicator-form.component.scss'],
  animations: [heightCollapse]
})
export class IndicatorFormComponent implements OnInit {

  public form: FormGroup | any;
  public organizations: any;
  public attackPatterns: any[] = [];
  public showPatternTranslations = false;
  public showSigmaTranslations = false;
  public firstShowPatternTranslations = false;
  public firstShowSigmaTranslations = false;
  public showAdditionalQueries = true;
  public includeQueries = {
    carElastic: true,
    carSplunk: true,
    cimSplunk: false
  };
  public patternHelpHtml: string = patternHelp;
  public observableDataHelpHtml: string = observableDataHelp;
  public patternObjs: PatternHandlerPatternObject[] = [];
  public patternObjSubject: Subject<PatternHandlerPatternObject[]> = new Subject();
  public editMode: boolean = false;
  public files: File[];
  public uploadProgress: number;
  public submitErrorMsg: string;
  public blockAttachments: boolean;
  public marking$: Observable<MarkingDefinition[]>;
  public markings = {
    object_marking_refs: []
  };
  public editData: any = null;
  public currentStepperIndex = 0;
  public patternSyntaxes = ['text', 'stix-pattern', 'sigma'];

  @ViewChild('associatedDataStep')
  public associatedDataStep: MatStep;

  @ViewChild('baseDataStep')
  public baseDataStep: MatStep;

  @ViewChild('stepper')
  public stepper: MatHorizontalStepper;

  private readonly BASE_DATA_STEPPER_INDEX = 0;
  private readonly ASSOCIATED_DATA_STEPPER_INDEX = 1;
  private initialPatternHandlerResponse: PatternHandlerTranslateAll = {
    pattern: null,
    validated: false,
    'car-elastic': null,
    'car-splunk': null,
    'cim-splunk': null
  };

  private initialGetObjectsResponse: PatternHandlerGetObjects = {
    pattern: null,
    validated: false
  };

  constructor(
    private indicatorSharingService: IndicatorSharingService,
    private authService: AuthService,
    private genericApi: GenericApi,
    public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>,
    public location: Location,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { 
    DomHelper.ScrollToTop();
  }

  public ngOnInit() {    
    this.store.dispatch(new HideFooter());
    this.resetForm();
    const route = this.route.snapshot.url.length && this.route.snapshot.url[0].path;
    if (route === 'edit') {
      this.editMode = true;
      observableForkJoin(
        this.route.params
          .pipe(
            pluck('id'),
            take(1)
          ),
        this.store.select('indicatorSharing')
          .pipe(
            pluck('indicators'),
            filter((indicators: any[]) => indicators.length > 0),
            take(1)
          )
      ).subscribe(
        ([indicatorId, indicators]: [string, any[]]) => {
          const indicatorToEdit = indicators.find((indicator) => indicator.id === indicatorId);
          if (indicatorToEdit) {
            this.editData = indicatorToEdit;            
            this.setEditValues();
          } else {
            console.log('Unable to find indicator to edit');
            this.store.dispatch(new NavigateToErrorPage(404));
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }

    const userId = this.authService.getUser()._id;
    const getData$ = combineLatest(
      this.store.select('stix').pipe(pluck<any, Identity[]>('identities')),
      this.indicatorSharingService.getUserProfileById(userId),
      this.store.select(getPreferredKillchainAttackPatterns)
    ).subscribe(
      (res) => {
        const identities = res[0];
        const user = res[1].attributes;
        const userOrgs = user.organizations;
        this.attackPatterns = res[2];
        if (userOrgs && userOrgs.length) {
          this.organizations = userOrgs
            .filter((org) => org.approved)
            .map((org) => identities.find((identity) => identity.id === org.id));
        }

        try {
          if (this.organizations.length === 1) {
            this.form.get('created_by_ref').patchValue(this.organizations[0].id);
          }
        } catch (error) { }
      },
      (err) => {
        console.log(err);
      },
      () => {
        if (getData$) {
          getData$.unsubscribe();
        }
      }
    );
    
    this.handlePatternChange();

    this.store
      .select('config')
      .pipe(
        pluck('runConfig'),
        distinctUntilChanged(),
    )
      .subscribe(
        (cfg: MasterConfig) => {
          this.blockAttachments = cfg.blockAttachments;
        }
      );

    this.form.get('metaProperties').get('relationships').valueChanges
      .subscribe(
        (apIds) => {
          const killChainPhaseSet = new Set();
          this.attackPatterns
            .filter((ap) => apIds.includes(ap.id) && ap.kill_chain_phases && ap.kill_chain_phases.length)
            .map((ap) => ap.kill_chain_phases.map((kcp) => JSON.stringify(kcp)))
            .forEach((kcpStrings) => kcpStrings.forEach((kcpString) => killChainPhaseSet.add(kcpString)));

          while (this.form.get('kill_chain_phases').length !== 0) {
            this.form.get('kill_chain_phases').removeAt(0)
          }

          Array.from(killChainPhaseSet)
            .map((kcpString) => JSON.parse(kcpString))
            .forEach((kcp) => {
              const kcpForm = KillChainPhasesForm();
              kcpForm.patchValue(kcp);
              this.form.get('kill_chain_phases').push(kcpForm);
            });
        },
        (err) => {
          console.log(err);
        }
      );

    this.marking$ = this.store
      .select('stix')
      .pipe(
        pluck('markingDefinitions')
      );
  }

  public resetForm(e = null) {
    if (e) {
      e.preventDefault();
    }
    this.form = IndicatorForm();
  }

  public stepOneInvalid(): boolean {
    return this.form.get('created_by_ref').status !== 'VALID' || this.form.get('pattern').status !== 'VALID';
  }

  public async submitIndicator() {
    this.submitErrorMsg = '';
    const tempIndicator: any = cleanObjectProperties({}, this.form.value);
    this.pruneQueries(tempIndicator);

    if (tempIndicator.metaProperties && !tempIndicator.metaProperties.relationships) {
      tempIndicator.metaProperties.relationships = [];
    }

    const [uploadError, filesToUpload] = await this.uploadFiles();
    if (!uploadError && filesToUpload && filesToUpload.length) {
      if (!tempIndicator.metaProperties) {
        tempIndicator.metaProperties = {};
      }
      if (this.editMode && this.editData.metaProperties && this.editData.metaProperties.attachments && this.editData.metaProperties.attachments.length) {
        const attachmentsToKeep = this.editData.metaProperties.attachments
          .filter((att) => {
            return this.files
              .filter((file) => (file as any)._id)
              .find((file) => (file as any)._id === att._id)
          });
        tempIndicator.metaProperties.attachments = attachmentsToKeep.concat(filesToUpload);
      } else {
        tempIndicator.metaProperties.attachments = filesToUpload;
      }
    } else if (this.editMode && this.editData.metaProperties && this.editData.metaProperties.attachments) {
      const attachmentsToKeep = this.editData.metaProperties.attachments
        .filter((att) => {
          return this.files
            .filter((file) => (file as any)._id)
            .find((file) => (file as any)._id === att._id)
        });
      tempIndicator.metaProperties.attachments = attachmentsToKeep;
    }

    if (uploadError) {
      this.submitErrorMsg = 'Unable to upload attachments.'
    }

    if (this.editMode) {
      if (this.editData.kill_chain_phases && !tempIndicator.kill_chain_phases) {
        // force removal of kill chain faces
        tempIndicator.kill_chain_phases = [];
      }
      tempIndicator.id = this.editData.id;
      if (this.editData.metaProperties && this.editData.metaProperties.interactions) {
        tempIndicator.metaProperties.interactions = this.editData.metaProperties.interactions;
      }
      // this.dialogRef.close({
      //   'indicator': tempIndicator,
      //   'newRelationships': (tempIndicator.metaProperties !== undefined && tempIndicator.metaProperties.relationships !== undefined),
      //   editMode: this.editMode
      // }); 
      this.store.dispatch(new indicatorSharingActions.StartUpdateIndicator(tempIndicator));
      this.location.back();
    } else {
      const addIndicator$ = this.indicatorSharingService.addIndicator(tempIndicator)
        .subscribe(
          (res) => {
            this.store.dispatch(new indicatorSharingActions.AddIndicator(res[0].attributes));
            this.store.dispatch(new indicatorSharingActions.FetchIndicators());
            if ((tempIndicator.metaProperties !== undefined && tempIndicator.metaProperties.relationships !== undefined)) {
              this.store.dispatch(new indicatorSharingActions.RefreshApMap());
            }
            this.location.back();
          },
          (err) => {
            console.log(err);
          },
          () => {
            addIndicator$.unsubscribe();
          }
        );
    }

  }

  public filesChange(files: File[]) {
    this.files = files;
  }

  public stepperChanged(event: StepperSelectionEvent) {
    this.currentStepperIndex = event.selectedIndex;
    
    if (event.selectedIndex === this.ASSOCIATED_DATA_STEPPER_INDEX) {
      // This is to prevent external reference form from showing errors if already visited
      this.associatedDataStep.interacted = false;
    }
    if (event.selectedIndex === this.BASE_DATA_STEPPER_INDEX) {
      // This is to prevent implementations form from showing errors if already visited
      this.baseDataStep.interacted = false;
    }
  }

  private uploadFiles(): Promise<[any, GridFSFile[]]> {
    this.uploadProgress = 0;
    return new Promise((resolve) => {
      if (this.blockAttachments) {
        console.log('Attachments are blocked');
        resolve([null, null]);
        return;
      }
      const newFiles = this.files && this.files.length ? this.files.filter((file) => !(file as any).existingFile) : [];
      if (newFiles.length) {
        const uploadFile$ = this.genericApi.uploadAttachments(newFiles, (prog) => this.uploadProgress = prog)
          .pipe(
            finalize(() => this.uploadProgress = 0 || uploadFile$ && uploadFile$.unsubscribe())
          )
          .subscribe(
            (response) => {
              resolve([null, response]);
            },
            (err) => {
              resolve([err, null]);
            }
          );
      } else {
        resolve([null, null]);
      }
    });
  }

  public changeStepperIndex(newIndex: number) {
    if (newIndex === this.currentStepperIndex) {
      // This should never be reached, but just in case!
      return;
    } else if (newIndex > this.currentStepperIndex) {
      // This method is largely due the fact that CdkStepper does not have a way to specify an index
      while (newIndex > this.stepper.selectedIndex) {
        this.stepper.next();
      }
    } else if (newIndex < this.currentStepperIndex) {
      while (newIndex < this.stepper.selectedIndex) {
        this.stepper.previous();
      }
    }
  }

  private setEditValues() {

    this.form.patchValue(this.editData);

    if (this.editData.external_references) {
      this.editData.external_references.forEach((extRef) => {
        const extRefCtrl = ExternalReferencesForm();
        extRefCtrl.patchValue(extRef);
        (this.form.get('external_references') as FormArray).push(extRefCtrl);
      });
    }

    if (this.editData.kill_chain_phases) {
      this.editData.kill_chain_phases.forEach((killchain) => {
        const kcCtrl = KillChainPhasesForm();
        kcCtrl.patchValue(killchain);
        (this.form.get('kill_chain_phases') as FormArray).push(kcCtrl);
      });
    }

    if (this.editData.labels) {
      this.editData.labels.forEach((label) => {
        (this.form.get('labels') as FormArray).push(new FormControl(label));
      });
    }

    if (this.editData.metaProperties) {
      if (this.editData.metaProperties.additional_queries) {
        this.editData.metaProperties.additional_queries.forEach((query) => {
          const additionalQueriesForm = AdditionalQueriesForm();
          additionalQueriesForm.patchValue(query);
          (this.form.get('metaProperties').get('additional_queries') as FormArray).push(additionalQueriesForm);
        });
      }

      if (this.editData.metaProperties.observedData) {
        requestAnimationFrame(() => this.patternObjSubject.next(this.editData.metaProperties.observedData));
      }

      if (
        this.editData.metaProperties.queries && 
        (this.editData.metaProperties.queries.carElastic && this.editData.metaProperties.queries.carElastic.include ||
        this.editData.metaProperties.queries.carSplunk && this.editData.metaProperties.queries.carSplunk.include ||
        this.editData.metaProperties.queries.cimSplunk && this.editData.metaProperties.queries.cimSplunk.include)
      ) {
        this.showPatternTranslations = true;
        this.firstShowPatternTranslations = true;
      }

      if (this.editData.metaProperties.sigmaQueries) {
        this.editData.metaProperties.sigmaQueries.forEach((sigmaQuery) => {
          const sigmaQueryForm = SigmaQueryForm();
          sigmaQueryForm.patchValue(sigmaQuery);
          (this.form.get('metaProperties').get('sigmaQueries') as FormArray).push(sigmaQueryForm);
        });

        if (this.editData.metaProperties.sigmaQueries.map(q => q.include).filter(q => !!q).length) {
          this.firstShowSigmaTranslations = true;
          this.showSigmaTranslations = true;
        }
      }

      if (this.editData.metaProperties.validStixPattern && !this.editData.metaProperties.patternSyntax) {
        this.form.get('metaProperties').get('patternSyntax').patchValue('stix-pattern');
      }
    }

    this.store.select('indicatorSharing')
      .pipe(
        pluck('indicatorToApMap'),
        take(1),
        map((indicatorToApMap) => (indicatorToApMap[this.editData.id] && indicatorToApMap[this.editData.id].map((ap) => ap.id)) || [])
      )
      .subscribe(
        (apIds) => {
          this.form.get('metaProperties').get('relationships').setValue(apIds);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  private pruneQueries(tempIndicator) {
    if (!tempIndicator.metaProperties.queries.carElastic.query || tempIndicator.metaProperties.queries.carElastic.query.length === 0) {
      try {
        delete tempIndicator.metaProperties.queries.carElastic;
      } catch (e) { }
    }

    if (!tempIndicator.metaProperties.queries.carSplunk.query || tempIndicator.metaProperties.queries.carSplunk.query.length === 0) {
      try {
        delete tempIndicator.metaProperties.queries.carSplunk;
      } catch (e) { }
    }

    if (!tempIndicator.metaProperties.queries.cimSplunk.query || tempIndicator.metaProperties.queries.cimSplunk.query.length === 0) {
      try {
        delete tempIndicator.metaProperties.queries.cimSplunk;
      } catch (e) { }
    }

    if (tempIndicator.metaProperties.sigmaQueries &&
      (tempIndicator.metaProperties.sigmaQueries.length === 0 || tempIndicator.metaProperties.sigmaQueries.map(q => q.include).filter(q => !!q).length === 0)
    ) {
      try {
        delete tempIndicator.metaProperties.sigmaQueries;
      } catch (e) { }
    } else if (tempIndicator.metaProperties.sigmaQueries && tempIndicator.metaProperties.sigmaQueries.length > 0) {
      tempIndicator.metaProperties.sigmaQueries = tempIndicator.metaProperties.sigmaQueries.filter((sigmaQuery) => sigmaQuery.query && sigmaQuery.include);
    }

    if (Object.keys(tempIndicator.metaProperties.queries).length === 0) {
      try {
        delete tempIndicator.metaProperties.queries;
      } catch (e) { }
    }    
  }  

  private handlePatternChange() {
    const skipCount = this.editMode ? 1 : 0;

    const patternChange$ = (this.form.get('pattern') as FormControl).valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        share(),
        finalize(() => patternChange$ && patternChange$.unsubscribe())
      );

    const stixPattern$ = combineLatest(
        patternChange$,
        this.form.get('metaProperties').get('patternSyntax').valueChanges
      )
      .pipe(
        skip(skipCount),
        filter(([_, syntax]) => syntax === 'stix-pattern'),
        switchMap(([pattern]): Observable<[PatternHandlerTranslateAll, PatternHandlerGetObjects]> => {
          if (pattern && pattern.length > 0) {
            return observableForkJoin(
              this.indicatorSharingService.translateAllPatterns(pattern).pipe(pluck('attributes')),
              this.indicatorSharingService.patternHandlerObjects(pattern).pipe(pluck('attributes'))
            );
          } else {
            return observableForkJoin(
              observableOf(this.initialPatternHandlerResponse),
              observableOf(this.initialGetObjectsResponse)
            );
          }
        })
      )
      .subscribe(
        ([translations, objects]: [PatternHandlerTranslateAll, PatternHandlerGetObjects]) => {         

          // ~~~ Pattern Translations ~~~
          this.form.get('metaProperties').get('validStixPattern').setValue(translations.validated);
          this.form.get('metaProperties').get('queries').get('carElastic').patchValue({
            query: translations['car-elastic']
          });
          this.form.get('metaProperties').get('queries').get('carSplunk').patchValue({
            query: translations['car-splunk']
          });
          this.form.get('metaProperties').get('queries').get('cimSplunk').patchValue({
            query: translations['cim-splunk']
          });

          if (translations['car-elastic'] || translations['car-splunk'] || translations['cim-splunk']) {
            this.showPatternTranslations = true;
            this.firstShowPatternTranslations = true;
            this.changeDetectorRef.markForCheck();
          }

          // ~~~ Pattern Objects ~~~
          if (!objects.object) {
            objects.object = [];
          }
          const patternObjSet: Set<string> = new Set(
            objects.object.map((patternObj: PatternHandlerPatternObject): string => JSON.stringify(patternObj))
          );
          this.patternObjs = Array.from(patternObjSet)
            .map((patternString: string): PatternHandlerPatternObject => JSON.parse(patternString))
            .map((patternObj: PatternHandlerPatternObject) => {
              patternObj.action = '*';
              return patternObj;
            }) || [];

          this.patternObjSubject.next(this.patternObjs);
        },
        (err) => {
          console.log(err);
        },
        () => {
          stixPattern$.unsubscribe();
        }
      );

    const sigma$ = combineLatest(
        patternChange$, this.form.get('metaProperties').get('patternSyntax').valueChanges
      )
      .pipe(
        skip(skipCount),
        filter(([_, syntax]) => syntax === 'sigma'),
        switchMap(([pattern]) => {
          if (pattern) {
            return this.indicatorSharingService.translateSigma(pattern);
          } else {
            return observableOf({ validated: false } as SigmaTranslations);
          }
        })
      )
      .subscribe((translationResp) => {
        this.form.get('metaProperties').get('validSigma').setValue(translationResp.validated);
        const sigmaQueries = this.form.get('metaProperties').get('sigmaQueries') as FormArray;
        while (sigmaQueries.length !== 0) {
          sigmaQueries.removeAt(0)
        }
        if (translationResp.translations && translationResp.translations.length) {
          translationResp.translations.forEach((translation) => {
            sigmaQueries.push(new FormGroup({
              tool: new FormControl(translation.tool),
              query: new FormControl(translation.query),
              include: new FormControl(true)
            }));
          });
          this.showSigmaTranslations = true;
          this.firstShowSigmaTranslations = true;
        } else {
          this.showSigmaTranslations = false;
        }
      });

    // Reset forms/objects related to STIX Patterns when another syntax is selected
    const resetStixPattern$ = this.form.get('metaProperties').get('patternSyntax').valueChanges
      .pipe(
        skip(skipCount),
        filter((syntax) => syntax !== 'stix-pattern'),
        finalize(() => resetStixPattern$ && resetStixPattern$.unsubscribe())
      )
      .subscribe(() => {
        this.form.get('metaProperties').get('validStixPattern').setValue(false);
        this.form.get('metaProperties').get('queries').get('carElastic').patchValue({ query: '' });
        this.form.get('metaProperties').get('queries').get('carSplunk').patchValue({ query: '' });
        this.form.get('metaProperties').get('queries').get('cimSplunk').patchValue({ query: '' });
        this.showPatternTranslations = false;
        this.firstShowPatternTranslations = false;
        this.patternObjs = [];
        this.patternObjSubject.next(this.patternObjs);
      });

    const resetSigma$ = this.form.get('metaProperties').get('patternSyntax').valueChanges
      .pipe(
        skip(skipCount),
        filter((syntax) => syntax !== 'sigma'),
        finalize(() => resetSigma$ && resetSigma$.unsubscribe())
      )
      .subscribe(() => {
        this.form.get('metaProperties').get('validSigma').setValue(false);
        const sigmaQueries = this.form.get('metaProperties').get('sigmaQueries') as FormArray;
        while (sigmaQueries.length !== 0) {
          sigmaQueries.removeAt(0)
        }
        this.showSigmaTranslations = false;
        this.firstShowSigmaTranslations = false;
      });
  }

  /**
   * @param  {FormControl} formCtrl
   * @returns void
   * @description Normalizes quotes on an input
   */
  public patternChange(formCtrl: FormControl): void {
    const originalValue = formCtrl.value;
    formCtrl.setValue(FormatHelpers.normalizeQuotes(originalValue));
  }

  public getMarkingLabel(marking) {
    return MarkingDefinitionHelpers.getMarkingLabel(marking);
  }

}
