import { Component, Input } from '@angular/core';

@Component({
  selector: 'published-checkbox',
  templateUrl: './published-checkbox.component.html',
  styleUrls: ['./published-checkbox.component.scss']
})
export class PublishedCheckboxComponent {
  @Input() public model: any;
}
