import { Component, Input } from '@angular/core';

@Component({
  selector: 'validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss']
})
export class ValidationErrorsComponent {
  @Input() public validationErrorMessages: string[] = [];

  constructor() { }
}
