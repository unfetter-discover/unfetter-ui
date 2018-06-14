import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import * as assessActions from '../store/baseline.actions';
import * as assessReducers from '../store/baseline.reducers';

import { BaselineForm } from '../../global/form-models/baseline';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { BaselineStateService } from '../services/baseline-state.service';
import { UpdatePageTitle } from '../store/baseline.actions';
import { AssessmentSet } from 'stix/assess/v3/baseline';

@Component({
  selector: 'unf-baseline-create',
  templateUrl: './create3.component.html',
  styleUrls: ['./create3.component.scss']
})
export class Create3Component implements OnInit {

  public assessMeta: BaselineMeta;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    public store: Store<assessReducers.BaselineState>,
  ) { }

  /**
   * @description
   */
  ngOnInit(): void {
    this.assessMeta = new BaselineMeta();
    this.resetForm();
    this.store.dispatch(new UpdatePageTitle(this.assessMeta.title));
  }

  /**
   * @description for this component create and set a fresh assess form
   * @return {void}
   */
  public resetForm(event?: UIEvent) {
    if (event) {
      event.preventDefault();
    }

    this.form = BaselineForm();
  }

  /**
   * @description
   * @return {void}
   */
  public submitForm(): void {
    const newBaseline = new AssessmentSet();
    newBaseline.name = this.form.value.title;
    newBaseline.description = this.form.value.description;
    newBaseline.created_by_ref = this.form.value.created_by_ref;
    newBaseline.created = new Date().toISOString();
    newBaseline.assessments = [];
    newBaseline.metaProperties = { published: false };
    this.store.dispatch(new assessActions.StartBaseline(newBaseline));
  }

  /**
   * @description
   * @param form 
   */
  public formToAssessment(form: FormGroup): BaselineMeta {
    const baseline = Object.assign(new BaselineMeta(), form.value);
    return baseline;
  }

  /**
   * @description on cancel, go back a step in window history
   * @param {UIEvnent} optional event
   * @return {void}
   */
  public onCancel(event?: UIEvent): void {
    this.location.back();
  }

  /**
   * @description on title field blur update the baseline name
   * @param {UIEvnent} optional event
   * @return {void}
   */
  public onTitleBlur(event?: UIEvent): void {
    this.store.dispatch(new UpdatePageTitle(this.form.value.title));
  }

  /**
   * @description updates created_by_ref upon org selection changes
   * @param {orgId} string
   * @return {void}
   */
  public orgSelected(orgId: string): void {
    this.form.get('created_by_ref').patchValue(orgId);
  }
}
