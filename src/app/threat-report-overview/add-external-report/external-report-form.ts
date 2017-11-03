import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export const ExternalReportForm = () => new FormGroup({
    external_ref_name: new FormControl('', Validators.required),
    external_ref_source_name: new FormControl('', Validators.required),
    external_ref_external_id: new FormControl('', Validators.required),
    external_ref_description: new FormControl(),
    external_ref_url: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl(),
    granular_markings: new FormArray([]),
    // external_references: new FormArray([]),
    kill_chain_phases: new FormArray([]),
    object_refs: new FormArray([])
    // title: new FormControl('', Validators.required),
    // source_type: new FormControl('', Validators.required),
    // alaStage: new FormControl(),
    // afaObjective: new FormControl(),
    // afaAction: new FormControl(),
    // description: new FormControl(),
    // actionParagraph: new FormControl(),
    // actionClassification: new FormControl(),
    // reportClassification: new FormControl(),
    // reportDtg: new FormControl(),
    // declassification: new FormControl(),
    // ala: new FormControl(),
    // ama: new FormControl(),
    // afa: new FormControl(),
    // author: new FormControl(),
    // url: new FormControl()
});
// Report Id,Title,Source Type,ALA Stage,AFA Objective,AFA Action,Description,Action Paragraph,Action Classification,Report 
//     Classification,Report DTG,Declassification,ALA,AMA,AFA,AUTHOR,ADDED DTG,QC AUTHOR,QC DTG
