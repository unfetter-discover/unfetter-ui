import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { ConfigService } from '../../services/config.service';

@Component({
    selector: 'add-label-reactive',
    templateUrl: 'add-label.component.html',
    styleUrls: ['add-label.component.scss']
})

export class AddLabelReactiveComponent implements OnInit {
    @Input() public parentForm: FormGroup;
    @Input() public stixType: string;

    public localForm: FormControl;
    public showAddLabel: boolean = false;
    public openVocabList: string[] = [];
    
    constructor(private configService: ConfigService) { }

    public ngOnInit() {
        this.setStixType();
        this.resetForm();
    }        

    public addToParent() {
        (this.parentForm.get('labels') as FormArray).push(this.localForm);
        this.resetForm();
        this.showAddLabel = false;
    }

    public buttonClick(e) {
        e.preventDefault();
        this.showAddLabel = !this.showAddLabel;
    }

    private setStixType() {
        switch (this.stixType) {
        case 'indicator':
            this.openVocabList = this.configService.configurations.openVocab['indicator-label-ov'].enum;
            break;
        case 'identity':
            this.openVocabList = this.configService.configurations.openVocab['identity-label-ov'].enum;
            break;
        case 'malware':
            this.openVocabList = this.configService.configurations.openVocab['malware-label-ov'].enum;
            break;
        case 'report':
            this.openVocabList = this.configService.configurations.openVocab['report-label-ov'].enum;
            break;
        case 'threat-actor':
            this.openVocabList = this.configService.configurations.openVocab['threat-actor-label-ov'].enum;
            break;
        case 'tool':
            this.openVocabList = this.configService.configurations.openVocab['tool-label-ov'].enum;
            break;
        }
    }

    private resetForm() {
        this.localForm = new FormControl('', Validators.required);
    }
}
