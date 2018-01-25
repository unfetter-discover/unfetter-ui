import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  assessment: boolean;

  constructor() { }

  ngOnInit() {
    this.assessment = true;
  }
}
