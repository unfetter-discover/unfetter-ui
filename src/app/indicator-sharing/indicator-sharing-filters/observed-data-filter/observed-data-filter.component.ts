import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'observed-data-filter',
  templateUrl: './observed-data-filter.component.html',
  styleUrls: ['./observed-data-filter.component.scss']
})
export class ObservedDataFilterComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ObservedDataFilterComponent>
  ) { }

  ngOnInit() {
  }

}
