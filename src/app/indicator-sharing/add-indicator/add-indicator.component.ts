import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { IndicatorForm } from '../../global/form-models/indicator';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { AuthService } from '../../core/services/auth.service';
import { heightCollapse } from '../../global/animations/height-collapse';
import { PatternHandlerTranslateAll, PatternHandlerGetObjects, PatternHandlerPatternObject } from '../../global/models/pattern-handlers';
import { patternHelp, observableDataHelp } from '../help-templates';
import { cleanObjectProperties } from '../../global/static/clean-object-properties';

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
    public patternValid: boolean = false;
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
        private indicatorSharingService: IndicatorSharingService,
        private authService: AuthService
    ) { }    

    public ngOnInit() {
        this.resetForm();

        const userId = this.authService.getUser()._id;
        const getData$ = Observable.forkJoin(
            this.indicatorSharingService.getIdentities(),
            this.indicatorSharingService.getUserProfileById(userId),
            this.indicatorSharingService.getAttackPatterns()
        ).subscribe(
            (res) => {       
                const identities = res[0].map((r) => r.attributes);
                const userOrgs = res[1].attributes.organizations;
                this.attackPatterns = res[2].map((r) => r.attributes);
                if (userOrgs && userOrgs.length) {
                    this.organizations = userOrgs
                        .filter((org) => org.approved)
                        .map((org) => identities.find((identity) => identity.id === org.id));   
                }                      
            },
            (err) => {
                console.log(err);
            },
            () => {
                getData$.unsubscribe();
            }
        );

        const patternChange$ = (this.form.get('pattern') as FormControl).valueChanges
            .debounceTime(100)
            .distinctUntilChanged()
            .switchMap((pattern: any): Observable<[PatternHandlerTranslateAll, PatternHandlerGetObjects]> => {
                if (pattern && pattern.length > 0) {
                    return Observable.forkJoin(
                        this.indicatorSharingService.translateAllPatterns(pattern).pluck('attributes'),
                        this.indicatorSharingService.patternHandlerObjects(pattern).pluck('attributes')
                    );
                } else {
                    return Observable.forkJoin(
                        Observable.of(this.initialPatternHandlerResponse),
                        Observable.of(this.initialGetObjectsResponse)
                    );
                }
            })
            .subscribe(
                ([translations, objects]: [PatternHandlerTranslateAll, PatternHandlerGetObjects]) => {

                    // ~~~ Pattern Translations ~~~
                    this.patternValid = translations.validated;
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

    public submitIndicator() {
        const tempIndicator: any = cleanObjectProperties({}, this.form.value);

        this.pruneQueries(tempIndicator);        

        const addIndicator$ = this.indicatorSharingService.addIndicator(tempIndicator)
            .subscribe(
                (res) => {                   
                    this.resetForm();
                    this.dialogRef.close({
                        'indicator': res[0].attributes,
                        'newRelationships': (tempIndicator.metaProperties !== undefined && tempIndicator.metaProperties.relationships !== undefined)
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
}
