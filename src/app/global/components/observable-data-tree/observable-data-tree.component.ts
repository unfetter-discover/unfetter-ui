import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { ObservedDataForm } from '../../form-models/observed-data';
import { heightCollapse } from '../../animations/height-collapse';
import * as fromRoot from '../../../root-store/app.reducers';
import { PatternHandlerPatternObject } from '../../models/pattern-handlers';

@Component({
    selector: 'observable-data-tree',
    templateUrl: 'observable-data-tree.component.html',
    styleUrls: ['observable-data-tree.component.scss'],
    animations: [heightCollapse]
})

export class ObservableDataTreeComponent implements OnInit {
    @Input() public parentForm: FormGroup;
    @Input() public observedDataPath: any[];
    @Input() public patternObjSubject: Subject<PatternHandlerPatternObject[]>;

    public observableDataTypes: any[];
    public showPropertyTree: any = {};
    public showTree: boolean = false;
    public checkboxModel: any = {};

    private oldPatternObjs: PatternHandlerPatternObject[];
    private currentPatternObjs: PatternHandlerPatternObject[];
    
    constructor(
        private store: Store<fromRoot.AppState>
    ) { 
        this.patternExists = this.patternExists.bind(this); 
    }

    public ngOnInit() {
        const config$ = this.store.select('config')
            .pluck('configurations')
            .filter((configurations: any) => configurations.observableDataTypes)
            .pluck('observableDataTypes')
            .subscribe(
            (observableDataTypes: any[]) => {
                this.observableDataTypes = observableDataTypes;
                if (this.observedDataPath && this.observedDataPath.length) {
                    this.buildTree(true);
                } else {
                    this.buildTree();
                }
            },
            (err) => {
                console.log(err);
            },
            () => {
                config$.unsubscribe();
            }
            );

        if (this.patternObjSubject) {
            this.initPatternSub();
        }
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

    private initPatternSub() {
        const getPattern$ = this.patternObjSubject
            .subscribe(
                (patternObjs: PatternHandlerPatternObject[]) => {
                    if (this.currentPatternObjs) {
                        // Uncheck old patterns
                        this.oldPatternObjs = [ ...this.currentPatternObjs ];
                        this.oldPatternObjs
                            .filter(this.patternExists)
                            .forEach((oldPattern: PatternHandlerPatternObject) => {
                                this.updateModels(oldPattern, false);
                            });
                    }
                    // Check current patterns
                    this.currentPatternObjs = patternObjs
                    this.currentPatternObjs
                        .filter(this.patternExists)
                        .forEach((curPattern: PatternHandlerPatternObject) => {
                            this.updateModels(curPattern, true);
                        });
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getPattern$.unsubscribe();
                }
            );
    }

    private patternExists(patterObj: PatternHandlerPatternObject): boolean {
        return this.checkboxModel[patterObj.name] && this.checkboxModel[patterObj.name][patterObj.action] && this.checkboxModel[patterObj.name][patterObj.action][patterObj.property] !== undefined;
    }

    private updateModels(patterObj: PatternHandlerPatternObject, checked: boolean): void {
        this.checkboxModel[patterObj.name][patterObj.action][patterObj.property] = checked;
        this.checkBoxChange({ checked }, patterObj.name, patterObj.action, patterObj.property);
    }
}
