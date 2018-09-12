import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, withLatestFrom, startWith, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StixCoreEnum } from 'stix';

import { AppState } from '../../../root-store/app.reducers';
import { ConfigState } from '../../../root-store/config/config.reducers';

@Component({
  selector: 'add-label-alt',
  templateUrl: './add-label-alt.component.html',
  styleUrls: ['./add-label-alt.component.scss']
})
export class AddLabelAltComponent implements OnInit {

  /** @required */
  @Input() public parentForm: FormGroup;
  /** @required */
  @Input() public stixType: StixCoreEnum | string;
  @Input() public parentDocumentType: string = 'analytic';

  public newLabel: FormControl;
  public openVocabList: string[] = [];
  public formResetComplete = true;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) { }

  public ngOnInit() {
    this.resetForm();

    const getVocab$ = this.parentForm.get('labels').valueChanges
      .pipe(
        startWith(this.parentForm.get('labels').value),
        withLatestFrom(
          this.store.select('config')
        ),
        map(([currentLabels, configState]: [string[], ConfigState]) => {
          if (configState.configurations.openVocab) {
            let localVocabList;
            switch (this.stixType) {
              case 'indicator':
                localVocabList = configState.configurations.openVocab['indicator-label-ov'].enum;
                break;
              case 'identity':
                localVocabList = configState.configurations.openVocab['identity-label-ov'].enum;
                break;
              case 'malware':
                localVocabList = configState.configurations.openVocab['malware-label-ov'].enum;
                break;
              case 'report':
                localVocabList = configState.configurations.openVocab['report-label-ov'].enum;
                break;
              case 'threat-actor':
                localVocabList = configState.configurations.openVocab['threat-actor-label-ov'].enum;
                break;
              case 'tool':
                localVocabList = configState.configurations.openVocab['tool-label-ov'].enum;
                break;
              default:
                localVocabList = [];
            }

            if (currentLabels && currentLabels.length) {
              return localVocabList.filter((ov) => !currentLabels.includes(ov)).sort();
            } else {
              return localVocabList;
            }
          } else {
            return [];
          }
        }),
        finalize(() => getVocab$ && getVocab$.unsubscribe())
      )
      .subscribe((ovList) => {
          this.openVocabList = ovList;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public resetForm() {
    this.newLabel = new FormControl('', Validators.required);
  }

  public addToParent() {
    const labels = this.parentForm.get('labels').value;
    (this.parentForm.get('labels') as FormArray).insert(0, this.newLabel);

    this.formResetComplete = false;
    this.resetForm();
    this.changeDetectorRef.detectChanges(); // To force rerender of angular material inputs
    this.formResetComplete = true;
  }

}
