import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import * as assessActions from '../store/assess.actions';
import * as assessReducers from '../store/assess.reducers';

import { AssessForm } from '../../global/form-models/assess';
import { AssessmentMeta } from '../../models/assess/assessment-meta';
import { AssessStateService } from '../services/assess-state.service';
import { UpdatePageTitle } from '../store/assess.actions';

@Component({
  selector: 'unf-assess-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public assessMeta: AssessmentMeta;
  public form: FormGroup;
  public title = '';

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    public store: Store<assessReducers.AssessState>,
  ) { }

  /**
   * @description
   */
  ngOnInit(): void {
    this.assessMeta = new AssessmentMeta();
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

    this.form = AssessForm();
  }

  /**
   * @description
   * @return {void}
   */
  public submitForm(): void {
    this.assessMeta = this.formToAssessment(this.form);
    console.log('submit form', this.assessMeta);
    this.store.dispatch(new assessActions.StartAssessment(this.assessMeta));
  }

  /**
   * @description
   * @param form 
   */
  public formToAssessment(form: FormGroup): AssessmentMeta {
    const assessment = Object.assign(new AssessmentMeta(), form.value);
    return assessment;
  }

  /**
   * @description on cancel, go back a step in window history
   */
  public onCancel(): void {
    this.location.back();
  }
}
