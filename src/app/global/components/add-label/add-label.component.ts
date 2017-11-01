import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'add-label-reactive',
    templateUrl: 'add-label.component.html',
    styleUrls: ['add-label.component.scss']
})

export class AddLabelReactiveComponent implements OnInit {
    @Input() public parentForm: any;

    public localForm: FormControl;
    public showAddLabel: boolean = false;
    
    constructor() { }

    public ngOnInit() {
        this.resetForm();
    }

    public resetForm() {
        this.localForm = new FormControl('');
    }

    public addToParent() {
        this.parentForm.get('labels').push(this.localForm);
        this.resetForm();
        this.showAddLabel = false;
    }

    public buttonClick(e) {
        e.preventDefault();
        this.showAddLabel = !this.showAddLabel;
    }
}
