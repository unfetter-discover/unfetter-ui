import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Assessment } from '../models/assessment';
import { AssessForm } from '../../global/form-models/assess';

@Component({
  selector: 'unf-assess-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public assessment: Assessment;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
}
