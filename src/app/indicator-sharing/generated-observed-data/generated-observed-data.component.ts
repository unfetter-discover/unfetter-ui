import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { PatternHandlerPatternObject } from '../../global/models/pattern-handlers';
import * as fromRoot from '../../root-store/app.reducers';

@Component({
  selector: 'generated-observed-data',
  templateUrl: './generated-observed-data.component.html',
  styleUrls: ['./generated-observed-data.component.scss']
})
export class GeneratedObservedDataComponent implements OnInit {

  @Input() public patternObjects: PatternHandlerPatternObject[] = [];
  @Input() public parentForm: FormGroup | any;
  
  public filteredPatternObjects: any[] = [];
  public obsData: any[] = [];

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    
    const config$ = this.store.select('config')
    .pluck('configurations')
    .filter((configurations: any) => configurations.observableDataTypes)
    .pluck('observableDataTypes')
    .subscribe(
      (observableDataTypes: any[]) => {
        const tempObservableDataTypes = [ ...observableDataTypes ];   
        this.filteredPatternObjects = this.patternObjects
          .filter((patternObject) => {
            const actions = tempObservableDataTypes.map((observableDataType) => observableDataType.name);
            return actions.includes(patternObject.name);
          });

        this.filteredPatternObjects
          .forEach((patternObject) => patternObject.actions = []);
        this.obsData = tempObservableDataTypes;
      },
      (err) => {
        console.log(err);
      },
      () => {
        config$.unsubscribe();
      }
    );
  }

  public getActions(dataObject) {
    const obsData = this.obsData.find((obs) => obs.name = dataObject);
    return obsData.actions || [];
  }
}
