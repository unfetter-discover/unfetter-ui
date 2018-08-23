import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormatHelpers } from '../../static/format-helpers';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'implementations-list',
  templateUrl: './implementations-list.component.html',
  styleUrls: ['./implementations-list.component.scss']
})
export class ImplementationsListComponent {
  @Input()
  public form: FormGroup;

  constructor() { }

  public whitespaceToBreak(comment: string): string {
    return FormatHelpers.whitespaceToBreak(comment);
  }

  public queryChange(formCtrl: FormControl): void {
    const originalValue = formCtrl.value;
    formCtrl.setValue(FormatHelpers.normalizeQuotes(originalValue));
  }
}
