import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  summary: boolean;

  constructor() { }

  ngOnInit() {
    this.summary = true;
  }
}
