import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ExtractTextSupportedFileTypes } from '../enums/extract-text-file-types.enum';
import { ExternalReferencesForm } from './external-references';

export const ReportForm = () => {
    return new FormGroup({
        created_by_ref: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl(),
        external_references: new FormArray([ExternalReferencesForm()]),
        labels: new FormArray([]),
        metaProperties: new FormGroup({
            extractedText: new FormGroup({
                fileType: new FormControl(ExtractTextSupportedFileTypes.PDF),
                method: new FormControl('URL') 
            }),
            published: new FormControl(true),
            textTags: new FormArray([])
        }),
        object_marking_refs: new FormControl([]),
        object_refs: new FormControl([])
    })
};
