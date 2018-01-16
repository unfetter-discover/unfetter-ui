import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as assessActions from '../store/assess.actions';
import * as assessReducers from '../store/assess.reducers';

import { AssessForm } from '../../global/form-models/assess';
import { AssessmentMeta } from '../../models/assess/assessment-meta';
import { AssessStateService } from '../services/assess-state.service';

@Component({
  selector: 'unf-assess-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public assessment: AssessmentMeta;
  public form: FormGroup;
  public title = '';

  constructor(
    private formBuilder: FormBuilder,
    public store: Store<assessReducers.AssessState>,
    public stateService: AssessStateService,
  ) { }

  /**
   * @description
   */
  ngOnInit(): void {
    this.assessment = new AssessmentMeta();
    this.stateService.publishPageTitle(this.assessment.title);
    this.resetForm();

    // listen for a change to wizard page event
    this.store.select('assessment')
      .subscribe((resp) => {
        console.log('assessment subscribe', resp);
      },
      (err) => console.log(err),
      () => console.log('done'));
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
    this.assessment = this.formToAssessment(this.form);
    console.log('submit form', this.assessment);
    this.store.dispatch(new assessActions.StartAssessment(this.assessment));
    // const getIdentities$ = this.store.select('indicatorSharing')
    // .pluck('identities')
    // .distinctUntilChanged()
    // .subscribe(
    //     (identities: any[]) => {
    //         this.identities = identities;
    //     },
    //     (err) => {
    //         console.log(err);
    //     },
    //     () => {
    //         if (getIdentities$) {
    //             getIdentities$.unsubscribe();
    //         }
    //     }
    // );
  }

  /**
   * @description
   * @param form 
   */
  public formToAssessment(form: FormGroup): AssessmentMeta {
    const assessment = Object.assign(new AssessmentMeta(), form.value);
    return assessment;
  }
}
