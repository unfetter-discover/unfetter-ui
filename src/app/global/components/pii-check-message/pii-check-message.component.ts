import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CheckPII } from '../../static/check-pii';
import { debounceTime, finalize } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'pii-check-message',
  templateUrl: './pii-check-message.component.html',
  styleUrls: ['./pii-check-message.component.scss']
})
export class PiiCheckMessageComponent implements OnInit {

  @Input() public formCtrl: FormControl;
  public piiWarnings: any[] = [];
  
  constructor() { }

  public ngOnInit() {
    const formChange$ = this.formCtrl.valueChanges
      .pipe(
        debounceTime(100),
        finalize(() => formChange$ && formChange$.unsubscribe())
      )
      .subscribe(
        (formVal) => {
          this.piiWarnings = CheckPII.validationErrors(formVal);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
