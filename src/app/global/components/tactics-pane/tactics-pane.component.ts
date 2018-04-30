import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tactics-pane',
  templateUrl: './tactics-pane.component.html',
  styleUrls: ['./tactics-pane.component.scss']
})
export class TacticsPaneComponent implements OnInit {

  public display = {
    title: 'Tactics Used',
    carousel: false,
    treemap: false,
    heatmap: true,
  };

  constructor() { }

  ngOnInit() {
  }

}
