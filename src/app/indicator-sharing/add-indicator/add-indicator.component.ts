import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { of as observableOf, forkJoin as observableForkJoin, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, pluck, tap, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatStep } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { IndicatorForm } from '../../global/form-models/indicator';
import { IndicatorSharingService } from '../indicator-sharing.service';
import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
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
import { RunConfigService } from '../../core/services/run-config.service';
import { MarkingDefinition } from '../../models';
import MarkingDefinitionHelpers from '../../global/static/marking-definition-helper';

@Component({
    selector: 'add-indicator',
    templateUrl: 'add-indicator.component.html',
    styleUrls: ['add-indicator.component.scss'],
    animations: [heightCollapse]
})
export class AddIndicatorComponent implements OnInit {

    public form: FormGroup | any;
    public organizations: any;
    public attackPatterns: any[] = [];
    public showPatternTranslations: boolean = false;
    public showAdditionalQueries: boolean = true;
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

    @ViewChild('associatedDataStep') 
    public associatedDataStep: MatStep;

    private readonly ASSOCIATED_DATA_STEPPER_INDEX = 2;
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
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public editData: any,
        private indicatorSharingService: IndicatorSharingService,
        private authService: AuthService,
        private genericApi: GenericApi,
        private runConfigService: RunConfigService,
        private store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>,
    ) { }    

    public ngOnInit() {
        this.resetForm();
        if (this.editData) {
            this.editMode = true;
            this.setEditValues();
        }

        const userId = this.authService.getUser()._id;
        const getData$ = observableForkJoin(
            this.indicatorSharingService.getIdentities(),
            this.indicatorSharingService.getUserProfileById(userId),
            this.indicatorSharingService.getAttackPatterns()
        ).subscribe(
            (res) => {
                const identities = res[0].map((r) => r.attributes);
                const user = res[1].attributes;
                const userOrgs = user.organizations;
                this.attackPatterns = res[2]
                    .map((r) => r.attributes)
                    .filter((ap) => {
                        if (user.preferences && user.preferences.killchain) {
                            return ap.kill_chain_phases && ap.kill_chain_phases.map((kc) => kc.kill_chain_name).includes(user.preferences.killchain);
                        } else {
                            return true;
                        }
                    });
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

        const patternChange$ = (this.form.get('pattern') as FormControl).valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((pattern: any): Observable<[PatternHandlerTranslateAll, PatternHandlerGetObjects]> => {
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
            }))
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
                    patternChange$.unsubscribe();
                }
            );

        this.runConfigService.config.subscribe((config) => {
                this.blockAttachments = config.blockAttachments;
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
        return this.form.get('name').status !== 'VALID' || this.form.get('created_by_ref').status !== 'VALID' || this.form.get('valid_from').status !== 'VALID';
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
            this.dialogRef.close({
                'indicator': tempIndicator,
                'newRelationships': (tempIndicator.metaProperties !== undefined && tempIndicator.metaProperties.relationships !== undefined),
                editMode: this.editMode
            });
        } else {
            const addIndicator$ = this.indicatorSharingService.addIndicator(tempIndicator)
                .subscribe(
                    (res) => {                   
                        this.resetForm();
                        this.dialogRef.close({
                            'indicator': res[0].attributes,
                            'newRelationships': (tempIndicator.metaProperties !== undefined && tempIndicator.metaProperties.relationships !== undefined),
                            editMode: this.editMode
                        });
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
        if (event.selectedIndex === this.ASSOCIATED_DATA_STEPPER_INDEX) {
            // This is to prevent external reference and kill chain forms from showing errors if already visited
            this.associatedDataStep.interacted = false;
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
                    (this.form.get('metaProperties').get('additional_queries') as FormArray).push(new FormControl(query));
                });
            }

            if (this.editData.metaProperties.observedData) {
                requestAnimationFrame(() => this.patternObjSubject.next(this.editData.metaProperties.observedData));
            }
        }
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

        if (Object.keys(tempIndicator.metaProperties.queries).length === 0) {
            try {
                delete tempIndicator.metaProperties.queries;
            } catch (e) { }
        }      
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
