import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'home',  // <home></home>
   // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  // constructor() {}

  public ngOnInit() {}
}
