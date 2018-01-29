import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  templateUrl: 'no-content.component.html',
  styleUrls: ['no-content.component.scss']
})
export class NoContentComponent {
  public errorMessage: string = '404: Page Not Found';
}
