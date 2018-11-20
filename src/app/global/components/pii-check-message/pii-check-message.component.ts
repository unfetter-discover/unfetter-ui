import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs/operators';

import { WebWorkerService } from '../../../core/services/web-worker.service';
import { WorkerTypes } from '../../enums/web-workers.enum';

@Component({
  selector: 'pii-check-message',
  templateUrl: './pii-check-message.component.html',
  styleUrls: ['./pii-check-message.component.scss']
})
export class PiiCheckMessageComponent implements OnInit {

  @Input() public formCtrl: FormControl;
  public piiWarnings$;
  public showWarnings = false;
  
  constructor(private webWorkerService: WebWorkerService) { } 

  public ngOnInit() {
    const client = this.webWorkerService.generateClient(WorkerTypes.PII_CHECK);
    const formVal$ = this.formCtrl.valueChanges
      .pipe(
        debounceTime(300),
      )
      .subscribe((formVal) => {
        client.sendMessage(formVal);
      });
    
    this.piiWarnings$ = client.connect()
      .pipe(
        tap((warnings) => this.showWarnings = warnings.length > 0)
      );   
  }
}
