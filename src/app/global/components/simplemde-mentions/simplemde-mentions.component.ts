import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'simplemde-mentions',
  templateUrl: './simplemde-mentions.component.html',
  styleUrls: ['./simplemde-mentions.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimplemdeMentionsComponent),
      multi: true
    }
  ]
})
export class SimplemdeMentionsComponent implements ControlValueAccessor {

  private onTouchedCallback: () => {}
  private onChangeCallback: (_: any) => {}
  private _innerValue: any;

  constructor() { }

  set value(v: any) {
    if (v !== this._innerValue) {
      this._innerValue = v
      this.onChangeCallback(v)
    }
  }

  get value(): any {
    return this._innerValue
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  writeValue(v: any) {
    if (v !== this._innerValue) {
      this._innerValue = v
    }
  }
}
