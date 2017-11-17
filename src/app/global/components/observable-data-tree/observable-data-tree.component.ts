import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { ConfigService } from '../../../core/services/config.service';
import { ObservedDataForm } from '../../form-models/observed-data';
import { heightCollapse } from '../../animations/height-collapse';

@Component({
    selector: 'observable-data-tree',
    templateUrl: 'observable-data-tree.component.html',
    styleUrls: ['observable-data-tree.component.scss'],
    animations: [heightCollapse]
})

export class ObservableDataTreeComponent implements OnInit {
    @Input() public parentForm: FormGroup;
    public observableDataTypes: [{
        name: string, 
        actions: string[], 
        properties: string[], 
        showActions: boolean
    }];
    public showPropertyTree: any = {};
    public showTree: boolean = false;
    public checkboxModel: any = {};
    
    constructor(private configService: ConfigService) { }

    public ngOnInit() {
        this.configService.getConfigPromise()
            .then((res) => this.buildTree())
            .catch((err) => console.log(err));
    }

    public checkBoxChange(e, name, action, property) {
        const observedDataForm = this.parentForm.get('metaProperties').get('observedData') as FormArray;
        if (e.checked) {
            const newForm = ObservedDataForm();
            newForm.get('name').setValue(name);
            newForm.get('action').setValue(action);
            newForm.get('property').setValue(property);
            observedDataForm.push(newForm);
        } else {
            let index = -1;
            observedDataForm.controls.forEach((control, i) => {
                if (control.value.name === name && control.value.action === action && control.value.property === property) {
                    index = i;
                }
            });
            if (index > -1) {
                observedDataForm.removeAt(index);
            } else {
                console.log('Could not find element in observedData form');
            }
        }
    }

    private buildTree() {
        this.observableDataTypes = this.configService.configurations.observableDataTypes;
        this.observableDataTypes.forEach((item) => {
            item.showActions = false;
            this.showPropertyTree[item.name] = {};
            this.checkboxModel[item.name] = {};
            item.actions.forEach((action: string) => {
                this.showPropertyTree[item.name][action] = false;
                this.checkboxModel[item.name][action] = {};

                item.properties.forEach((prop) => this.checkboxModel[item.name][action][prop] = false);
            });
        });
    }
}
