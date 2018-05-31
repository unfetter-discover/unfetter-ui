import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CheckPII } from '../../static/check-pii';

@Component({
  selector: 'pii-check-message',
  templateUrl: './pii-check-message.component.html',
  styleUrls: ['./pii-check-message.component.scss']
})
export class PiiCheckMessageComponent {

  @Input() public formCtrl: FormControl;
  
  constructor() { }

  public getPiiWarning(inputString: string): any[] {
    return CheckPII.validationErrors(inputString);
  }
}
