import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {

     @Input() public pageTitle: string;
     @Input() public pageIcon: string;
     @Input() public description: string;
     public showDescription: boolean = true;

    public toggleDescription(event): void {
        event.preventDefault();
        this.showDescription = !this.showDescription;
    }
}
