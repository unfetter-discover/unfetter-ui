import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

import { ReportForm } from '../../global/form-models/report';
import { AppState } from '../../root-store/app.reducers';
import MarkingDefinitionHelpers from '../../global/static/marking-definition-helper';
import { ExtractTextSupportedFileTypes } from '../../global/enums/extract-text-file-types.enum';
import { ExtractTextService } from '../../core/services/extract-text.service';
import { OpenSnackbar } from '../../root-store/utility/utility.actions';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFormComponent implements OnInit {

  public form: FormGroup = ReportForm();
  public editMode = false;
  public marking$: Observable<any>;
  public supportedFileTypes: string[] = Object.values(ExtractTextSupportedFileTypes).concat('Other');

  constructor(
    public location: Location,
    private store: Store<AppState>,
    private extractTextService: ExtractTextService
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

  public extractTextByUrl() {
    if (this.form.get('external_references').get('0').status === 'INVALID') {
      console.warn('Attempt to extract text by url without a valid form');
      return;
    }
    const url = this.form.get('external_references').get('0').get('url').value;
    const fileType = this.form.get('metaProperties').get('extractedText').get('fileType').value;
    this.extractTextService.extractTextFromUrl(url, fileType)
      .subscribe(
        ({ extractedText }) => {
          this.form.get('description').setValue(extractedText)
        },
        (err) => {
          this.store.dispatch(new OpenSnackbar('Unable to extract text'));
        }
      );
  }

  private resetForm() {
    this.form = ReportForm();
  }

}
