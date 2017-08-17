import { Component,  OnInit,  ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
/*
 * App Component
 * Top Level Component
 */
@Component({
   selector: 'assessments-layout',
   templateUrl: './assessments-layout.component.html'
})
export class AssessmentsLayoutComponent implements OnInit {
  public ngOnInit() {
    console.log('Initial App State');
  }

}
