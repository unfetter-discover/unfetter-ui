import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { PatternHandlerPatternObject } from '../../../global/models/pattern-handlers';

@Component({
  selector: 'observed-data-filter',
  templateUrl: './observed-data-filter.component.html',
  styleUrls: ['./observed-data-filter.component.scss']
})
export class ObservedDataFilterComponent implements OnInit {

  public observedDataPath: PatternHandlerPatternObject[];

  constructor(
    public dialogRef: MatDialogRef<ObservedDataFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formCtrl: FormControl }
  ) { }

  public ngOnInit() {
    this.observedDataPath = [ ...this.data.formCtrl.value ];
  }

  public accept() {
    this.data.formCtrl.setValue(this.observedDataPath);
    this.dialogRef.close(true);
  }
}
