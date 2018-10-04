import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromThreat from '../store/threat.actions';
import { ThreatFeatureState } from '../store/threat.reducers';

@Component({
  selector: 'master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss']
})
export class MasterLayoutComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<ThreatFeatureState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromThreat.FetchBaseData());
  }
  
  ngOnDestroy() {
    this.store.dispatch(new fromThreat.ClearData());
  }
}
