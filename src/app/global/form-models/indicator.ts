import { FormGroup, FormControl, Validators, FormArray, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { IndicatorSharingService } from '../../indicator-sharing/indicator-sharing.service';
import { PatternHandlerTranslateAll } from '../models/pattern-handlers';

class IndicatorValidator {

    public initialRatternHandlerResponse: PatternHandlerTranslateAll = {
        pattern: null,
        validated: false,
        'car-elastic': null,
        'car-splunk': null,
        'cim-splunk': null
    };

    constructor(public indicatorSharingService: IndicatorSharingService) { 
        this.patternValidatorAndTranslator = this.patternValidatorAndTranslator.bind(this);
    } 

    public patternValidatorAndTranslator(patternCtrl: FormControl): Observable<any> {
        // Timer is used to act as a debounce with an async validator
        return Observable.timer(100)
            .switchMap(() => {
                if (patternCtrl.value && patternCtrl.value.length > 0) {                    
                    return this.indicatorSharingService.translateAllPatterns(patternCtrl.value);                    
                } else {
                    return Observable.of({ attributes: this.initialRatternHandlerResponse });
                }
            })
            .pluck('attributes')
            .do((res: PatternHandlerTranslateAll) => {
                patternCtrl.parent.get('metaProperties').get('queries').get('carElastic').patchValue({
                    query: res['car-elastic']
                });
                patternCtrl.parent.get('metaProperties').get('queries').get('carSplunk').patchValue({
                    query: res['car-splunk']
                });
                patternCtrl.parent.get('metaProperties').get('queries').get('cimSplunk').patchValue({
                    query: res['cim-splunk']
                });
            })
            .pluck('validated')
            .map((validated: boolean) => validated ? null : { 'invalidPattern': true });
    }
}

export const IndicatorForm = (indicatorSharingService: IndicatorSharingService = null, useAsyncPatternHandler: boolean = false) => {

    let validator;
    if (indicatorSharingService) {
        validator = new IndicatorValidator(indicatorSharingService);
    }

    return new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(),
        labels: new FormArray([]),
        pattern: new FormControl('', Validators.required, useAsyncPatternHandler && validator ? validator.patternValidatorAndTranslator : null),
        created_by_ref: new FormControl('', Validators.required),
        valid_from: new FormControl(new Date(), Validators.required),
        valid_until: new FormControl(),
        external_references: new FormArray([]),
        kill_chain_phases: new FormArray([]),
        metaProperties: new FormGroup({
            observedData: new FormArray([]),
            relationships: new FormControl([]),
            queries: new FormGroup({
                carElastic: new FormGroup({
                    query: new FormControl(''),
                    include: new FormControl(true)
                }),
                carSplunk: new FormGroup({
                    query: new FormControl(''),
                    include: new FormControl(true)
                }),
                cimSplunk: new FormGroup({
                    query: new FormControl(''),
                    include: new FormControl(true)
                })
            })
        })
    })
};
