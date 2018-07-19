
import { map, filter, pluck } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppState } from '../../../root-store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RxjsHelpers } from '../../static/rxjs-helpers';
import { ConfigKeys } from '../../enums/config-keys.enum';

@Component({
  selector: 'data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

  @Input()
  public formCtrl: FormControl;

  public dataSources$: Observable<any[]>;

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.dataSources$ = this.store.select('config')
      .pipe(
        pluck('configurations'),
        filter(RxjsHelpers.filterByConfigKey(ConfigKeys.DATA_SOURCES)),
        pluck(ConfigKeys.DATA_SOURCES),
        // Hack to get this data structure compatible with the selection list
        map((dataSources: string[]) => dataSources.sort().map((ds) => ({ id: ds, name: ds })))
      );
  }

}
