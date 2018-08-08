import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

export const IndicatorForm = () => {
    return new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(),
        labels: new FormArray([]),
        pattern: new FormControl('', Validators.required),
        created_by_ref: new FormControl('', Validators.required),
        valid_from: new FormControl(new Date(), Validators.required),
        valid_until: new FormControl(),
        object_marking_refs: new FormControl([]),
        external_references: new FormArray([]),
        kill_chain_phases: new FormArray([]),
        x_mitre_data_sources: new FormControl([]),
        metaProperties: new FormGroup({
            observedData: new FormArray([]),
            additional_queries: new FormArray([]),
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
            }),
            validStixPattern: new FormControl(false),
            published: new FormControl(true)
        })
    })
};
