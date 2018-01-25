import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AdditionalQueriesForm } from '../../form-models/additional-queries';
import { heightCollapse } from '../../animations/height-collapse';

@Component({
  selector: 'additional-queries',
  templateUrl: './additional-queries.component.html',
  styleUrls: ['./additional-queries.component.scss'],
  animations: [heightCollapse]
})
export class AdditionalQueriesComponent implements OnInit {

  @Input() public parentForm: any;

  public localForm: FormGroup;
  public showForm: boolean = true;
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
}
