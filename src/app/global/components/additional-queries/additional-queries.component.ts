import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AdditionalQueriesForm } from '../../form-models/additional-queries';
import { FormatHelpers } from '../../static/format-helpers';

@Component({
  selector: 'additional-queries',
  templateUrl: './additional-queries.component.html',
  styleUrls: ['./additional-queries.component.scss']
})
export class AdditionalQueriesComponent implements OnInit {

  @Input() public parentForm: any;
  @Input() public parentDocumentType: string = 'analytic';

  public localForm: FormGroup;
  public formResetComplete = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnInit() {
    this.resetForm();
  }

  public resetForm() {
    this.localForm = AdditionalQueriesForm();
  }

  public addToParent() {
    this.parentForm.get('metaProperties').get('additional_queries').push(this.localForm);

    this.formResetComplete = false;
    this.resetForm();
    this.changeDetectorRef.detectChanges(); // To force rerender of angular material inputs
    this.formResetComplete = true;
  }

  /**
   * @param  {FormControl} formCtrl
   * @returns void
   * @description Normalizes quotes on an input
   */
  public queryChange(formCtrl: FormControl): void {
    const originalValue = formCtrl.value;
    formCtrl.setValue(FormatHelpers.normalizeQuotes(originalValue));
  }
}
