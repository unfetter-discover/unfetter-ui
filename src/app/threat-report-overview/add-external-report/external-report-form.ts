import { FormGroup, FormControl, Validators } from '@angular/forms';

export const ExternalReportForm = () => new FormGroup({
    name: new FormControl('', Validators.required),
    source_name: new FormControl('', Validators.required),
    external_id: new FormControl('', Validators.required),
    description: new FormControl(),
    url: new FormControl('', Validators.required)
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
