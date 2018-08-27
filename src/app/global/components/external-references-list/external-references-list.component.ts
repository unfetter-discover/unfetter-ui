import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'external-references-list',
  templateUrl: './external-references-list.component.html',
  styleUrls: ['./external-references-list.component.scss']
})
export class ExternalReferencesListComponent {

  @Input()
  public form: FormGroup;

  constructor() { }
}
