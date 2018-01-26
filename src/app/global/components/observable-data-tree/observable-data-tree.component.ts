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
    @Input() public observedDataPath: any[];

    public observableDataTypes: any[];
    public showPropertyTree: any = {};
    public showTree: boolean = false;
    public checkboxModel: any = {};
    
    constructor(private configService: ConfigService) { }

    public ngOnInit() {
        this.configService.getConfigPromise()
            .then((res) => {
                if (this.observedDataPath && this.observedDataPath.length) {
                    this.buildTree(true);
                } else {
                    this.buildTree();
                }
            })
            .catch((err) => console.log(err));
    }

    public checkBoxChange(e, name, action, property) {

        // If input is reactive
        if (this.parentForm) {

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

        // If input is standard array
        } else if (this.observedDataPath) {

            if (e.checked) {
                this.observedDataPath.push({
                    name,
                    action,
                    property
                });              
            } else {
                let index = -1;
                this.observedDataPath.forEach((obs, i) => {
                    if (obs.name === name && obs.action === action && obs.property === property) {
                        index = i;
                    }
                });

                if (index > -1) {
                    this.observedDataPath.splice(index, 1);
                } else {
                    console.log('Could not find element in observedDataPath');
                }
            }

        } else {
            console.log('There is nothing to add observable data to, please use a componenant input');
        }
        
    }

    public actionChecked(name: string, action: string): boolean {
        return Object.values(this.checkboxModel[name][action] || {}).includes(true);
    }

    public nameChecked(name: string): boolean {
        return Object.values(this.checkboxModel[name] || {})
            .map(Object.values)
            .reduce((prev: boolean[], cur: boolean[]) => prev.concat(cur), [])
            .includes(true);
    }

    private buildTree(observedDataPathPresent?: boolean) {
        this.observableDataTypes = this.configService.configurations.observableDataTypes;
        this.observableDataTypes.forEach((item) => {
            item.showActions = false;
            this.showPropertyTree[item.name] = {};
            this.checkboxModel[item.name] = {};
            item.actions.forEach((action: string) => {
                this.showPropertyTree[item.name][action] = false;
                this.checkboxModel[item.name][action] = {};

                if (observedDataPathPresent) {
                    item.properties.forEach((prop) => {
                        const findObs = this.observedDataPath.find((obsPath) => obsPath.name === item.name && obsPath.action === action && obsPath.property === prop);                        
                        this.checkboxModel[item.name][action][prop] = findObs ? true : false;
                    });
                } else {
                    item.properties.forEach((prop) => this.checkboxModel[item.name][action][prop] = false);
                }
            });
        });
    }
}
