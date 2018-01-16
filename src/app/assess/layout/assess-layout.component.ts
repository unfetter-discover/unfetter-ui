import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AssessStateService } from '../services/assess-state.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'assess-layout',
  templateUrl: './assess-layout.component.html',
  styleUrls: ['./assess-layout.component.scss'],
})
export class AssessLayoutComponent implements OnInit {
  public title: Observable<string>;

  public constructor(
    public stateService: AssessStateService,
  ) { }

  public ngOnInit() { 
    this.title = this.stateService.pageTitle$;
  }
}
