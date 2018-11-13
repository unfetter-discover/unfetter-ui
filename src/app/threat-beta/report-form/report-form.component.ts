import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
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
  public file: File;

  @ViewChild('fileInput') public fileInput: ElementRef;

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

  public extractTextByFile() {
    const fileType = this.form.get('metaProperties').get('extractedText').get('fileType').value;
    this.extractTextService.extractTextFromFile(this.file, fileType)
      .subscribe(
        ({ extractedText }) => {
          this.form.get('description').setValue(extractedText)
        },
        (err) => {
          this.store.dispatch(new OpenSnackbar('Unable to extract text'));
        }
      );
  }

  fileInputChange(event) {
    this.file = event.target.files[0];    
  }

  selectFiles() {
    this.fileInput.nativeElement.click();
  }

  private resetForm() {
    this.form = ReportForm();
  }

}
