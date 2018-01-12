import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as assessActions from '../store/assess.actions';
import * as assessReducers from '../store/assess.reducers';

import { AssessForm } from '../../global/form-models/assess';
import { Assessment } from '../../models/asssess/assessment';

@Component({
  selector: 'unf-assess-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public assessment: Assessment;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public store: Store<assessReducers.AssessState>,
  ) {
  }
  
  /**
   * @description
   */
  ngOnInit(): void {
    this.assessment = new Assessment();
    this.resetForm();
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
  public formToAssessment(form: FormGroup): Assessment {
    const assessment = Object.assign(new Assessment(), form.value);
    return assessment;
  }
}
