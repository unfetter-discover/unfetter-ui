import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StixCoreEnum } from 'stix';
import { switchMap, withLatestFrom, pluck } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../../root-store/app.reducers';

@Component({
  selector: 'text-tag-list',
  templateUrl: './text-tag-list.component.html',
  styleUrls: ['./text-tag-list.component.scss']
})
export class TextTagListComponent implements OnInit {

  @Input()
  public form: FormGroup;
  @Input()
  public dataType: StixCoreEnum | string = StixCoreEnum.ATTACK_PATTERN;
  @Input()
  public dataIpProperty: string = 'id';
  @Input()
  public dataNameProperty: string = 'name';

  public idToNameMap = {};

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    let dataObs;
    switch (this.dataType) {
      case StixCoreEnum.ATTACK_PATTERN:
        dataObs = this.store.select('stix').pipe(pluck('attackPatterns'));
        break;
      default:
        dataObs = observableOf([]);
    }

    dataObs.subscribe((data) => {
      this.idToNameMap = {};
      data.forEach((datum) => {
        this.idToNameMap[datum[this.dataIpProperty]] = datum[this.dataNameProperty];
      });
    });    
  }

}
