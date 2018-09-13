import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { ConfigService } from '../../../core/services/config.service';

@Component({
    selector: 'add-label-reactive',
    templateUrl: 'add-label.component.html',
    styleUrls: ['add-label.component.scss']
})

export class AddLabelReactiveComponent implements OnInit {
    @Input() public parentForm: FormGroup = new FormGroup({
        labels: new FormArray([])
    });
    @Input() public stixType: string;
    @Input() public currentLabels: string[] = [];
    @Input() public parentDocumentType: string = 'analytic';
    @Output() public labelAdded: EventEmitter<string> = new EventEmitter();

    @ViewChild('labelInput')
    public labelInput: ElementRef;

    public localForm: FormControl;
    public showAddLabel: boolean = false;
    public openVocabList: string[] = [];
    
    constructor(private configService: ConfigService) { }

    public ngOnInit() {
        this.configService.getConfigPromise()
            .then((res) => this.setStixType())
            .catch((err) => console.log(err));

        this.resetForm();
    }        

    public addToParent() {        
        if (this.openVocabList.includes(this.localForm.value)) {
            this.openVocabList.splice(this.openVocabList.indexOf(this.localForm.value), 1);
        }
        this.labelAdded.emit(this.localForm.value);
        (this.parentForm.get('labels') as FormArray).push(this.localForm);
        this.resetForm();
        this.showAddLabel = false;
    }

    public buttonClick(e) {
        console.log('~~~~', this.labelInput);
        e.preventDefault();
        this.showAddLabel = !this.showAddLabel;
        if (this.showAddLabel) {
            this.labelInput.nativeElement.focus();
        }
    }

    public inputEnter(e: KeyboardEvent) {
        // requestAnimationFrame is used to give time to auto complete to change form value
        // The value is checked as well so there is not a submit if the value was set by the autocomplete
        const valueBeforeCallback = this.localForm.value;
        requestAnimationFrame(() => {
            if (this.localForm.status === 'VALID' && valueBeforeCallback === this.localForm.value) {
                this.addToParent();                
            }
        });
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

        this.openVocabList = this.openVocabList
            .filter((ov) => !(this.parentForm.get('labels') as FormArray).value.includes(ov) && !this.currentLabels.includes(ov))
            .sort();
    }

    private resetForm() {
        this.localForm = new FormControl('', Validators.required);
    }
}
