import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.scss']
})
export class ErrorCardComponent {

  @Input() public errorTitle: string = 'An Error Occured';
  @Input() public errorBody: string = 'An error occured, but we don\'t have any details.';

  constructor() { }
}
