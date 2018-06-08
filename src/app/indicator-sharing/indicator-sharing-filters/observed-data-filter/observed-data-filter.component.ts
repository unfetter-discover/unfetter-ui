import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'observed-data-filter',
  templateUrl: './observed-data-filter.component.html',
  styleUrls: ['./observed-data-filter.component.scss']
})
export class ObservedDataFilterComponent {

  constructor(
    public dialogRef: MatDialogRef<ObservedDataFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formCtrl: FormControl }
  ) { }
  // TODO add clear button

  accept() {
    this.dialogRef.close(true);
  }
}
