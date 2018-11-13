import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

import { ReportForm } from '../../global/form-models/report';
import { AppState } from '../../root-store/app.reducers';
import MarkingDefinitionHelpers from '../../global/static/marking-definition-helper';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  public form: FormGroup = ReportForm();
  public editMode = false;
  public marking$: Observable<any>;

  constructor(
    public location: Location,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.marking$ = this.store
      .select('stix')
      .pipe(
        pluck('markingDefinitions'),
        map((markings: any[]) => {
          return markings.map((marking) => {
            return {
              ...marking,
              label: MarkingDefinitionHelpers.getMarkingLabel(marking)
            };
          });
        })
      );
  }

  private resetForm() {
    this.form = ReportForm();
  }

}
