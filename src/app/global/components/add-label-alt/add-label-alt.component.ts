import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'add-label-alt',
  templateUrl: './add-label-alt.component.html',
  styleUrls: ['./add-label-alt.component.scss']
})
export class AddLabelAltComponent implements OnInit {

  @Input() public parentForm: FormGroup;
  @Input() public parentDocumentType: string = 'analytic';

  public newLabel: FormControl;
  public formResetComplete = true;  

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnInit() {
    this.resetForm();
  }

  public resetForm() {
    this.newLabel = new FormControl('', Validators.required);
  }

  public addToParent() {
    const labels = this.parentForm.get('labels').value;
    (this.parentForm.get('labels') as FormArray).insert(0, this.newLabel);
    console.log('~~~', this.parentForm);

    this.formResetComplete = false;
    this.resetForm();
    this.changeDetectorRef.detectChanges(); // To force rerender of angular material inputs
    this.formResetComplete = true;
  }

}
