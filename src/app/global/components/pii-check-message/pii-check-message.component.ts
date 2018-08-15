import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs/operators';

import { CheckPII } from '../../static/check-pii';
import { WebWorkerHelpers, WorkerUrls } from '../../static/web-worker-helper';

@Component({
  selector: 'pii-check-message',
  templateUrl: './pii-check-message.component.html',
  styleUrls: ['./pii-check-message.component.scss']
})
export class PiiCheckMessageComponent implements OnInit, OnDestroy {

  @Input() public formCtrl: FormControl;
  public piiWarnings$;
  public showWarnings = false;
  
  constructor() { } 

  public ngOnInit() {
    const formVal$ = this.formCtrl.valueChanges
      .pipe(
        debounceTime(300),
        map((formVal) => ({ payload: formVal }))
      );
    
    this.piiWarnings$ = WebWorkerHelpers.createWebWorkerSubject <[{ name: string, matches: string[] }]>(formVal$, WorkerUrls.PII_CHECK)
      .pipe(
        tap((warnings) => this.showWarnings = warnings.length > 0)
      );   
  }

  public ngOnDestroy() {
    if (this.piiWarnings$) {
      this.piiWarnings$.unsubscribe();
    }
  }
}
